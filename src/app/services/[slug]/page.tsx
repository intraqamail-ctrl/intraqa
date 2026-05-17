import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findServiceBySlug, allServices } from "@/data/services";
import { ServiceDetailPage } from "@/marketing/ServiceDetailPage";

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = findServiceBySlug(slug);
  if (!service) {
    return { title: "Service" };
  }
  return {
    title: service.title,
    description: service.summary,
    openGraph: {
      title: `${service.title}   IntraQA`,
      description: service.summary,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = findServiceBySlug(slug);
  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
