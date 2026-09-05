import { Metadata } from "next";
import { notFound } from "next/navigation";

import { systemsData } from "../_data/systems";
import { SystemDetail } from "../_components/SystemDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return Object.keys(systemsData).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const system = systemsData[id];

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
  const system = systemsData[id];

  if (!system) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <SystemDetail system={system} />
      </div>
    </div>
  );
}
