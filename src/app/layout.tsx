import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Chatbot } from "@/components/site/Chatbot";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "IntraQA   Expert Software Testing, QA Automation & Intelligent Security",
    template: "%s | IntraQA",
  },
  description:
    "Software testing and quality engineering at scale   SDET-led QA automation, cybersecurity, AI/ML testing and cloud assurance for teams that ship fast.",
  authors: [{ name: "IntraQA" }],
  openGraph: {
    title: "IntraQA   Software Testing, QA Automation & Intelligent Security Engineering",
    description:
      "Full-stack software testing partner: QA, test automation, pentesting and AI-assisted quality engineering.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IntraQA   Software Testing & Intelligent Security",
    description: "Expert software testing, automation and security baked into every release.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Chatbot />
        </div>
      </body>
    </html>
  );
}
