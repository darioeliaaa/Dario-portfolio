"use client";
import { CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { z } from "zod";

/**
 * Il messaggio parte dal sito stesso: POST alla nostra rotta, che invia
 * l'email lato server (src/app/api/contact/route.ts) tenendo la chiave fuori
 * dal browser.
 *
 * Qui c'era un ID Formspree hardcoded arrivato col template di partenza — un
 * form di QUALCUN ALTRO, ancora vivo e che accettava invii: il visitatore
 * leggeva "Messaggio inviato" e il messaggio finiva nella casella del
 * proprietario di quel form.
 *
 * NEXT_PUBLIC_FORM_ENDPOINT resta come scorciatoia per puntare a un servizio
 * esterno (Formspree, Basin…) senza toccare il codice, ma non serve: se è
 * vuota si usa la rotta interna.
 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT?.trim() || "/api/contact";

const SUBJECTS = [
    "Sito vetrina / Landing page",
    "E-commerce",
    "Web app / Portale su misura",
    "Manutenzione o restyling",
    "Proposta di lavoro",
    "Altro",
] as const;

const formSchema = z.object({
    fullName: z.string().min(2, "Il nome completo deve contenere almeno 2 caratteri"),
    email: z.string().email("Inserisci un indirizzo email valido"),
    subject: z.string().min(1, "Seleziona di cosa hai bisogno"),
    message: z.string().min(10, "Il messaggio deve contenere almeno 10 caratteri"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>;

const ContactForm = () => {
    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [subject, setSubject] = React.useState<string>(SUBJECTS[0]);
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [sent, setSent] = React.useState(false);
    // Il messaggio d'errore del server, mostrato così com'è: distingue
    // "servizio non configurato" da "hai inviato troppi messaggi".
    const [sendError, setSendError] = React.useState("");
    const [errors, setErrors] = React.useState<FieldErrors>({});
    // Honeypot: real people never see this field, bots fill everything.
    const honeypot = React.useRef<HTMLInputElement>(null);

    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setSendError("");

        // Silently accept-and-drop bot submissions.
        if (honeypot.current?.value) {
            setSent(true);
            return;
        }

        const result = formSchema.safeParse({ fullName, email, subject, message });
        if (!result.success) {
            const fieldErrors: FieldErrors = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof FieldErrors;
                if (!fieldErrors[field]) fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: fullName,
                    email,
                    subject,
                    message,
                    // Honeypot: vuoto per le persone, pieno per i bot. Il
                    // server lo ricontrolla e scarta in silenzio.
                    company: honeypot.current?.value ?? "",
                }),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(
                    data.error || "Non sono riuscito a inviare il messaggio. Riprova tra poco."
                );
            }

            toast({
                title: "Messaggio inviato 🎉",
                description: "Grazie! Ti rispondo il prima possibile.",
                className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
            });

            // A little reward for taking the time to write — origin follows
            // the submit button so the burst feels tied to the click itself.
            const rect = (e.currentTarget as HTMLFormElement)
                .querySelector('button[type="submit"]')
                ?.getBoundingClientRect();
            import("canvas-confetti").then(({ default: confetti }) => {
                confetti({
                    particleCount: 90,
                    spread: 75,
                    startVelocity: 35,
                    colors: ["#61A6FA", "#B877F9", "#ffffff"],
                    origin: rect
                        ? {
                              x: (rect.left + rect.width / 2) / window.innerWidth,
                              y: (rect.top + rect.height / 2) / window.innerHeight,
                          }
                        : { y: 0.6 },
                });
            });

            setFullName("");
            setEmail("");
            setMessage("");
            setSubject(SUBJECTS[0]);
            // Stay put: the old version pushed back to "/", yanking the reader
            // away from the section they were reading.
            setSent(true);
        } catch (err) {
            const msg =
                err instanceof Error && err.message
                    ? err.message
                    : "Qualcosa è andato storto! Per favore riprova.";
            // Anche nel form, non solo nel toast: il toast sparisce da solo e
            // chi stava scrivendo si ritroverebbe senza sapere cos'è successo.
            setSendError(msg);
            toast({
                title: "Errore",
                description: msg,
                className: cn(
                    "top-0 w-full flex justify-center fixed md:max-w-7xl md:top-4 md:right-4"
                ),
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div
                role="status"
                className="flex flex-col items-center gap-3 rounded-xl border border-border bg-secondary/30 px-6 py-10 text-center"
            >
                <CheckCircle2 className="h-8 w-8 text-spark" />
                <p className="font-display text-lg font-bold">Messaggio inviato!</p>
                <p className="max-w-sm text-sm text-muted-foreground">
                    Grazie per avermi scritto. Ti rispondo di solito entro 24 ore.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSent(false)}>
                    Invia un altro messaggio
                </Button>
            </div>
        );
    }

    return (
        <form className="mx-auto w-full" onSubmit={handleSubmit} aria-busy={loading} noValidate>
            {/* Honeypot — hidden from people and from screen readers. */}
            <div className="absolute h-0 w-0 overflow-hidden" aria-hidden>
                <label htmlFor="company-website">Non compilare questo campo</label>
                <input
                    ref={honeypot}
                    id="company-website"
                    name="company-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-x-3 md:space-y-0">
                <LabelInputContainer>
                    <Label htmlFor="fullname">Nome completo</Label>
                    <Input
                        id="fullname"
                        name="name"
                        placeholder="Il tuo nome"
                        type="text"
                        autoComplete="name"
                        value={fullName}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? "err-fullname" : undefined}
                        onChange={(e) => {
                            setFullName(e.target.value);
                            setErrors((p) => ({ ...p, fullName: undefined }));
                        }}
                    />
                    <FieldError id="err-fullname" message={errors.fullName} />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="email">Indirizzo email</Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="tu@esempio.com"
                        type="email"
                        autoComplete="email"
                        value={email}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "err-email" : undefined}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors((p) => ({ ...p, email: undefined }));
                        }}
                    />
                    <FieldError id="err-email" message={errors.email} />
                </LabelInputContainer>
            </div>

            <div className="mb-4 grid w-full gap-2">
                <Label htmlFor="subject">Di cosa hai bisogno?</Label>
                <select
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={cn(
                        "h-10 w-full rounded-md border border-border bg-secondary/40 px-3 text-base md:text-sm",
                        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    )}
                >
                    {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4 grid w-full gap-2">
                <Label htmlFor="content">Il tuo messaggio</Label>
                <Textarea
                    placeholder="Parlami del tuo progetto: obiettivi, tempi e budget indicativo…"
                    id="content"
                    name="message"
                    value={message}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "err-message" : "hint-message"}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        setErrors((p) => ({ ...p, message: undefined }));
                    }}
                />
                <FieldError id="err-message" message={errors.message} />
                <p id="hint-message" className="text-xs text-muted-foreground">
                    Non condividerò mai i tuoi dati con nessun altro. Promesso.
                </p>
            </div>

            {sendError && (
                <p
                    role="alert"
                    className="mb-3 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                >
                    {sendError}
                </p>
            )}

            <Button disabled={loading} className="w-full" size="lg" type="submit">
                {loading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Invio in corso…
                    </>
                ) : (
                    <>
                        Invia messaggio
                        <ChevronRight className="h-4 w-4" />
                    </>
                )}
            </Button>
        </form>
    );
};

export default ContactForm;

const FieldError = ({ id, message }: { id: string; message?: string }) =>
    message ? (
        <p id={id} role="alert" className="text-sm text-destructive">
            {message}
        </p>
    ) : null;

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
