import type { Metadata } from "next";
import { config } from "@/data/config";
import CvView from "./cv-view";

export const metadata: Metadata = {
  title: "Curriculum",
  description: `Curriculum di ${config.author} — ${config.role}. Formazione, esperienze, competenze e progetti.`,
  alternates: { canonical: "/cv" },
};

export default function CvPage() {
  return <CvView />;
}
