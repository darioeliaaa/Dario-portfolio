import type { Metadata } from "next";
import NotFoundView from "./not-found-view";

export const metadata: Metadata = {
  title: "404 — Pagina non trovata",
  description: "La pagina che cerchi non esiste o è stata spostata.",
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return <NotFoundView />;
}
