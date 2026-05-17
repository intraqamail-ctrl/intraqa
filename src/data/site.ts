export const site = {
  name: "IntraQA",
  tagline: "AI-Driven Quality. Intelligent Security.",
  description:
    "IntraQA is a full-stack SDET partner. We embed quality engineering, cybersecurity and AI/ML testing into the way you ship   so your team can move faster, safely.",
  emails: {
    sales: "sales@intraqa.com",
    careers: "career@intraqa.com",
    inbox: "intraqamail@gmail.com",
  },
  domain: "intraqa.com",
  social: {
    linkedin: "https://www.linkedin.com/",
    twitter: "https://x.com/",
    github: "https://github.com/",
  },
};

export const stats = [
  {
    value: "99%",
    label: "Test coverage guaranteed",
    body: "We ship with 99% test coverage so quality is a baseline, not a bonus.",
  },
  {
    value: "$250M",
    label: "Potential loss saved",
    body: "Proactive testing has prevented hundreds of millions in client-side losses.",
  },
  {
    value: "500+",
    label: "Vulnerabilities remediated",
    body: "Critical CVEs and business-logic flaws caught   and fixed   before release.",
  },
  {
    value: "120+",
    label: "Products shipped",
    body: "From early-stage startups to enterprises in BFSI, health-tech and SaaS.",
  },
];

export const trustLogos = [
  "Skyscanner",
  "Canva",
  "BitsCrunch",
  "TestRail",
  "JustWines",
  "TestMu",
  "Clinigma",
  "Solutions by STC",
  "Jam",
  "Razorpay",
];

export const recognitions = [
  "CERT-In Empanelled",
  "ISO 27001",
  "Top-rated on Upwork",
  "Clutch Verified",
  "AWS Partner",
  "Microsoft for Startups",
];

export const hashtags = [
  "#SoftwareTesting",
  "#BackendTesting",
  "#TestAutomation",
  "#BugFreeSoftware",
  "#QualityAssurance",
  "#TestingTools",
  "#PerformanceTesting",
  "#QAExperts",
  "#FunctionalTesting",
  "#DigitalAssurance",
  "#APITesting",
  "#AgileTesting",
];

export const hashtagsSec = [
  "#SecureSoftware",
  "#Cybersecurity",
  "#CyberThreats",
  "#VAPT",
  "#AIinCybersecurity",
  "#CloudSecurity",
  "#DigitalSecurity",
  "#DataProtection",
  "#SecureSDLC",
  "#RiskManagement",
  "#PenetrationTesting",
  "#CERTIn",
];

export const testimonials = [
  {
    quote:
      "IntraQA caught a payments edge case our internal team had missed for two release cycles. They paid for themselves on day one.",
    author: "Priya N.",
    role: "VP Engineering, Fintech Series B",
  },
  {
    quote:
      "Their VAPT report read like a story, not a checklist. The remediation guidance was the most useful security deliverable we've ever received.",
    author: "Marcus L.",
    role: "CISO, HealthTech SaaS",
  },
  {
    quote:
      "We went from 14 days of regression to 6 hours. The automation framework they built is the most valuable code in our repo.",
    author: "Aman G.",
    role: "Head of QA, B2B SaaS",
  },
  {
    quote:
      "They embedded like senior engineers from day one. We treat them as part of the team   because they show up like one.",
    author: "Sarah K.",
    role: "CTO, Marketplace Platform",
  },
];

export const industries = [
  {
    name: "BFSI",
    body: "Banking, financial services and insurance   compliance-grade testing for regulated workloads.",
  },
  { name: "Healthcare", body: "HIPAA-aligned testing for HealthTech, EHRs and connected devices." },
  { name: "E-commerce", body: "Scale, peak-season load and conversion-critical checkout flows." },
  { name: "SaaS", body: "Multi-tenant, multi-region SaaS with continuous delivery." },
  { name: "Government", body: "CERT-In empanelled audits for govt and critical infrastructure." },
  { name: "Gaming", body: "Multiplayer, anti-cheat and compliance testing for studios." },
];

export const sellingPoints = [
  {
    title: "AI-Driven Solutions",
    body: "Cutting-edge frameworks like Defendly and AI-assisted PenTesting for faster, smarter assessments.",
  },
  {
    title: "Custom Strategies",
    body: "Every engagement is shaped around your stack, risk profile and ROI targets   never copy-pasted.",
  },
  {
    title: "Embedded Engineers",
    body: "Senior SDETs and security engineers who plug into your sprints, your tooling and your culture.",
  },
  {
    title: "Compliance-Grade Reporting",
    body: "Deliverables that satisfy CERT-In, SOC 2, ISO 27001 and the auditors your customers send.",
  },
];

export type NavGroup = {
  label: string;
  href?: string;
  sections?: { title: string; links: { label: string; href: string }[] }[];
};
import { serviceCategories } from "./services";

export const navGroups: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    sections: serviceCategories.map((c) => ({
      title: c.title,
      links: c.items.map((i) => ({ label: i.title, href: `/services/${i.slug}` })),
    })),
  },
  {
    label: "Company",
    sections: [
      {
        title: "About",
        links: [
          { label: "Why IntraQA", href: "/why-us" },
          { label: "About us", href: "/about" },
          { label: "Industries", href: "/industries" },
        ],
      },
      {
        title: "Join us",
        links: [
          { label: "Careers", href: "/careers" },
          { label: "Life at IntraQA", href: "/careers#life" },
        ],
      },
    ],
  },
  { label: "Compliance", href: "/compliance" },
  { label: "Contact", href: "/contact" },
];
