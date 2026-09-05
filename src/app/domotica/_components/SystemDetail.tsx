"use client";

import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  Cpu,
  DollarSign,
  HardDrive,
  Info,
  Layers,
  ShieldCheck,
  Target,
  Wrench,
  Zap,
} from "lucide-react";
import { Card, Chip, Tabs } from "@heroui/react";

import type { DomoticSystem } from "../_data/systems";

export interface SystemDetailProps {
  system: DomoticSystem;
}

const cardStyle =
  "rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800";

const accentBadgeVars =
  "[--chip-bg:#eef2ff] [--chip-fg:#4338ca] dark:[--chip-bg:#3730a3]/40 dark:[--chip-fg:#c7d2fe]";

const tabTriggerStyle =
  "flex-1 gap-2 rounded-lg text-slate-600 data-[selected=true]:bg-white data-[selected=true]:font-semibold data-[selected=true]:text-indigo-600 data-[selected=true]:shadow-sm dark:text-slate-400 dark:data-[selected=true]:bg-slate-700 dark:data-[selected=true]:text-indigo-400";

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={`w-full ${cardStyle}`}>
      <Card.Header>
        <div className="flex items-center gap-2 text-slate-400">
          <Icon aria-hidden="true" className="size-4 text-indigo-500" />
          <span className="text-xs font-bold tracking-wider uppercase">
            {title}
          </span>
        </div>
      </Card.Header>
      <Card.Content>{children}</Card.Content>
    </Card>
  );
}

export function SystemDetail({ system }: SystemDetailProps) {
  return (
    <div className="flex flex-col gap-5">
      <Link
        href="/domotica"
        className="inline-flex w-fit items-center gap-1 text-sm text-slate-500 transition-colors hover:text-slate-800 dark:hover:text-slate-100"
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
        Volver al catálogo
      </Link>

      <Card className={`w-full ${cardStyle}`}>
        <Card.Content className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
              {system.category}
            </span>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-50">
              {system.name}
            </h1>
          </div>
          <Chip className={`self-start sm:self-center ${accentBadgeVars}`}>
            {system.badge}
          </Chip>
        </Card.Content>
      </Card>

      <Tabs defaultSelectedKey="ficha">
        <Tabs.List
          aria-label="Secciones del sistema"
          className="rounded-xl bg-slate-200/60 p-1.5 dark:bg-slate-800/60"
        >
          <Tabs.Tab className={tabTriggerStyle} id="ficha">
            <Info aria-hidden="true" className="size-4" />
            Ficha
          </Tabs.Tab>
          <Tabs.Tab className={tabTriggerStyle} id="componentes">
            <Layers aria-hidden="true" className="size-4" />
            Componentes
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel className="mt-4 flex flex-col gap-4" id="ficha">
          <SectionCard icon={Target} title="Público objetivo">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {system.targetAudience}
            </p>
          </SectionCard>

          <SectionCard icon={ShieldCheck} title="Necesidad que cubre">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {system.needsCovered.map((need) => (
                <li
                  key={need}
                  className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-emerald-500"
                  />
                  <span>{need}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard icon={Cpu} title="Características">
            <div className="space-y-3">
              {system.features.map((feature, idx) => (
                <div
                  key={feature.label}
                  className={`text-sm ${
                    idx < system.features.length - 1
                      ? "border-b border-slate-100 pb-2 dark:border-slate-700"
                      : ""
                  }`}
                >
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {feature.label}:{" "}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {feature.value}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard icon={Zap} title="Capacidad de carga">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {system.loadCapacity.map((load) => (
                <div
                  key={load.label}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-900/40"
                >
                  <div className="mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {load.label}
                  </div>
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {load.value}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <Card className={`w-full ${cardStyle}`}>
            <Card.Content className="space-y-6">
              <div>
                <div className="mb-4 flex items-center gap-2 text-slate-400">
                  <Wrench aria-hidden="true" className="size-4 text-indigo-500" />
                  <span className="text-xs font-bold tracking-wider uppercase">
                    Preparación en obra
                  </span>
                </div>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {system.sitePreparation.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <div className="size-1.5 shrink-0 rounded-full bg-indigo-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-100 pt-4 dark:border-slate-700">
                <div className="mb-2 flex items-center gap-2 text-slate-400">
                  <HardDrive aria-hidden="true" className="size-4 text-indigo-500" />
                  <span className="text-xs font-bold tracking-wider uppercase">
                    Instalación
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {system.installation}
                </p>
              </div>
            </Card.Content>
          </Card>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border border-indigo-100/60 bg-indigo-50/50 p-5 dark:border-indigo-500/20 dark:bg-indigo-500/10">
              <div className="rounded-xl bg-indigo-100/80 p-3 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                <DollarSign aria-hidden="true" className="size-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">
                  Inversión aprox.
                </div>
                <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {system.investment}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200/60 bg-slate-100/70 p-5 dark:border-slate-700 dark:bg-slate-700/40">
              <div className="rounded-xl bg-slate-200 p-3 text-slate-600 dark:bg-slate-600 dark:text-slate-200">
                <Wrench aria-hidden="true" className="size-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">
                  Mantenimiento
                </div>
                <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {system.maintenance}
                </div>
              </div>
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel className="mt-4" id="componentes">
          <Card className={`w-full ${cardStyle}`}>
            <Card.Header>
              <div className="flex items-center gap-2 text-slate-400">
                <Layers aria-hidden="true" className="size-4 text-indigo-500" />
                <span className="text-xs font-bold tracking-wider uppercase">
                  Componentes del sistema
                </span>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                  <thead className="border-b border-slate-100 text-xs font-bold tracking-wider text-slate-400 uppercase dark:border-slate-700">
                    <tr>
                      <th className="px-4 py-3">Componente</th>
                      <th className="px-4 py-3">Categoría</th>
                      <th className="px-4 py-3 text-right">
                        Cantidad sugerida
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {system.components.map((component) => (
                      <tr
                        key={component.name}
                        className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-700/30"
                      >
                        <td className="px-4 py-3.5 font-medium text-slate-800 dark:text-slate-100">
                          {component.name}
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                          {component.type}
                        </td>
                        <td className="px-4 py-3.5 text-right font-semibold text-indigo-600 dark:text-indigo-400">
                          {component.qty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Content>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
