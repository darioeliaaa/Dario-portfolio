import type { Metadata } from "next";
import { config } from "@/data/config";
import CvView from "./cv-view";

const cvDescription = `Curriculum di ${config.author} — ${config.role}. Formazione, esperienze, competenze e progetti.`;

export const metadata: Metadata = {
  title: "Curriculum",
  description: cvDescription,
  alternates: { canonical: "/cv" },
  // Senza questi, la card social di /cv ereditava titolo e descrizione della
  // home (solo l'immagine cambiava, via cv/opengraph-image.tsx accanto a
  // questo file) — chi riceveva il link del curriculum vedeva scritto il
  // titolo generico del sito invece di "Curriculum".
  openGraph: {
    title: `Curriculum — ${config.author}`,
    description: cvDescription,
    url: `${config.site}/cv`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `Curriculum — ${config.author}`,
    description: cvDescription,
  },
};

export default function CvPage() {
  return <CvView />;
}
