import type { Metadata } from "next";
import { HomePage } from "@/marketing/HomePage";

export const metadata: Metadata = {
  title: "Software Testing, QA Automation & Security   AI-Driven Quality",
  description:
    "External quality engineering & security powerhouse for modern companies   SDET-led QA, hardened defense, and AI-accelerated testing.",
};

export default function Page() {
  return <HomePage />;
}
