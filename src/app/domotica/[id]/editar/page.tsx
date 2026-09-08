import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { getCategories, getSystemForEdit } from "../../_data/queries";
import { NewSystemForm } from "../../nuevo/_components/NewSystemForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Editar sistema",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSystemPage({ params }: PageProps) {
  const { id } = await params;
  const [categories, system] = await Promise.all([
    getCategories(),
    getSystemForEdit(id),
  ]);

  if (!system) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-5">
      <Link
        href={`/domotica/${id}`}
        className="inline-flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
        Volver al sistema
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-foreground">Editar sistema</h1>
        <p className="mt-1 text-sm text-muted">
          Actualizá los datos de {system.name}.
        </p>
      </div>

      <NewSystemForm categories={categories} initialData={system} originalSlug={id} />
    </div>
  );
}
