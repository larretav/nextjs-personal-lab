import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { getCategories } from "../_data/queries";
import { NewSystemForm } from "./_components/NewSystemForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agregar sistema",
};

export default async function NewSystemPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-5">
      <Link
        href="/domotica"
        className="inline-flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
        Volver al catálogo
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-foreground">Agregar sistema</h1>
        <p className="mt-1 text-sm text-muted">
          Carga un sistema domótico nuevo en el catálogo.
        </p>
      </div>

      <NewSystemForm categories={categories} />
    </div>
  );
}
