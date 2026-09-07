import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSystemBySlug } from "../_data/queries";
import { SystemDetail } from "../_components/SystemDetail";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const system = await getSystemBySlug(id);

  if (!system) {
    return { title: "Sistema no encontrado" };
  }

  return {
    title: system.name,
    description: system.targetAudience,
  };
}

export default async function SystemPage({ params }: PageProps) {
  const { id } = await params;
  const system = await getSystemBySlug(id);

  if (!system) {
    notFound();
  }

  return <SystemDetail system={system} />;
}
