import { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@heroui/react";

import { getCategoryNames, getSystemsList } from "./_data/queries";
import { CatalogBrowser } from "./_components/CatalogBrowser";
import { ThemeSwitch } from "@/src/components/theme-switch";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Catálogo domótico",
  description:
    "Ficha técnica de sistemas de domótica: para quién es cada uno, qué necesita la vivienda y qué componentes lleva.",
};

export default async function DomoticaPage() {
  const [systemsList, categories] = await Promise.all([
    getSystemsList(),
    getCategoryNames(),
  ]);

  return (
    <>
      <header className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Sistemas inteligentes
          </h1>
        </div>
        <ThemeSwitch className="mt-2 shrink-0" />
      </header>

      <div className="mt-6">
        <Link href="/domotica/nuevo" className={buttonVariants({ size: "sm" })}>
          Agregar sistema
        </Link>
      </div>

      <div className="mt-6">
        <CatalogBrowser systems={systemsList} categories={categories} />
      </div>
    </>
  );
}
