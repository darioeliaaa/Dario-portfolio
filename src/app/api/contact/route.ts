import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { config } from "@/data/config";

/**
 * Invio del form contatti, lato server.
 *
 * Il messaggio parte da qui, non dal browser: la chiave Resend resta sul
 * server e non finisce mai nel bundle. Prima il form postava direttamente a
 * un endpoint Formspree esterno (per giunta ereditato dal template, quindi
 * altrui); ora il browser parla solo con questo dominio.
 *
 * La validazione è rifatta qui da zero: quella nel componente serve a dare
 * un errore gentile mentre si scrive, ma chiunque può postare a questa rotta
 * con curl, quindi lato server non ci si fida di niente.
 */

// Nessun `export const runtime` / `dynamic` qui: con cacheComponents attivo
// (next.config.mjs) Next rifiuta entrambi in compilazione. Sarebbero comunque
// ridondanti — Node è il runtime predefinito e un POST che legge il corpo
// della richiesta non è cacheabile.

const schema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(200),
    subject: z.string().trim().min(1).max(120),
    message: z.string().trim().min(10).max(5000),
    // Honeypot: le persone non lo vedono, i bot riempiono tutto.
    company: z.string().max(200).optional(),
});

/**
 * Rate limit minimale, in memoria. Su Vercel ogni istanza ha la sua mappa e
 * le istanze vanno e vengono, quindi non è una difesa seria contro un attacco
 * distribuito — ferma però il caso concreto: qualcuno che tiene premuto
 * "invia" e riempie la casella. Per qualcosa di più solido servirebbe uno
 * store condiviso (Upstash, KV).
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

const isRateLimited = (ip: string) => {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    // Tiene pulita la mappa: senza questo cresce all'infinito.
    if (hits.size > 500) {
        for (const [key, times] of hits) {
            if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
        }
    }
    return recent.length > MAX_PER_WINDOW;
};

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

export async function POST(request: Request) {
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "sconosciuto";

    if (isRateLimited(ip)) {
        return NextResponse.json(
            { error: "Hai inviato troppi messaggi di fila. Riprova tra un minuto." },
            { status: 429 }
        );
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: "Controlla i campi: qualcosa non va." },
            { status: 422 }
        );
    }

    const { name, email, subject, message, company } = parsed.data;

    // Bot: accettiamo in silenzio e buttiamo via, così non capiscono di essere
    // stati scoperti e non provano un'altra strada.
    if (company) return NextResponse.json({ ok: true });

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
        // Meglio un errore onesto che un finto "inviato": chi scrive deve
        // sapere che il messaggio non è partito e può usare un altro canale.
        console.error("[contact] RESEND_API_KEY non configurata: invio annullato.");
        return NextResponse.json(
            { error: "Il servizio di invio non è configurato. Scrivimi su LinkedIn nel frattempo." },
            { status: 503 }
        );
    }

    const to = process.env.CONTACT_TO_EMAIL?.trim() || config.contactEmail;
    // Il mittente deve appartenere a un dominio verificato su Resend.
    // onboarding@resend.dev funziona senza verificare niente, ma consegna
    // solo all'indirizzo con cui è stato aperto l'account Resend.
    const from = process.env.CONTACT_FROM_EMAIL?.trim() || "onboarding@resend.dev";

    try {
        const { error } = await new Resend(apiKey).emails.send({
            from: `Portfolio <${from}>`,
            to: [to],
            // Rispondendo all'email si scrive alla persona, non a me stesso.
            replyTo: email,
            subject: `Nuovo contatto dal portfolio — ${subject}`,
            text: [
                `Nome: ${name}`,
                `Email: ${email}`,
                `Richiesta: ${subject}`,
                "",
                message,
            ].join("\n"),
            html: `
                <h2 style="margin:0 0 16px;font-family:system-ui,sans-serif">Nuovo contatto dal portfolio</h2>
                <p style="font-family:system-ui,sans-serif;line-height:1.7;margin:0 0 16px">
                    <strong>Nome:</strong> ${escapeHtml(name)}<br>
                    <strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br>
                    <strong>Richiesta:</strong> ${escapeHtml(subject)}
                </p>
                <p style="font-family:system-ui,sans-serif;line-height:1.7;white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
            `,
        });

        if (error) {
            // Il messaggio di Resend può contenere dettagli di configurazione:
            // resta nei log del server, al client va una frase generica.
            console.error("[contact] Resend ha rifiutato l'invio:", error);
            return NextResponse.json(
                { error: "Non sono riuscito a inviare il messaggio. Riprova tra poco." },
                { status: 502 }
            );
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[contact] invio fallito:", err);
        return NextResponse.json(
            { error: "Non sono riuscito a inviare il messaggio. Riprova tra poco." },
            { status: 500 }
        );
    }
}
