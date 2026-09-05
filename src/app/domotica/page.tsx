import { Metadata } from "next";

import { categories, systemsList } from "./_data/systems";
import { CatalogBrowser } from "./_components/CatalogBrowser";
import { ThemeSwitch } from "@/src/components/theme-switch";

export const metadata: Metadata = {
  title: "Catálogo domótico",
  description:
    "Ficha técnica de sistemas de domótica: para quién es cada uno, qué necesita la vivienda y qué componentes lleva.",
};

export default function DomoticaPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <header className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-50">
              Catálogo domótico
            </h1>
            <p className="mt-2 max-w-xl text-slate-500 dark:text-slate-400">
              Seis sistemas de hogar inteligente: para qué sirven, qué
              necesitan de la vivienda y qué llevan para instalarse.
            </p>
          </div>
          <ThemeSwitch className="mt-2 shrink-0" />
        </header>

        <div className="mt-10">
          <CatalogBrowser systems={systemsList} categories={categories} />
        </div>
      </div>
    </div>
  );
}
