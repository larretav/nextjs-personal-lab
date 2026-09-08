"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  Cpu,
  DollarSign,
  HardDrive,
  Info,
  Layers,
  Pencil,
  ShieldCheck,
  Target,
  Trash2,
  Wrench,
  Zap,
} from "lucide-react";
import { AlertDialog, Button, buttonVariants, Card, Chip, Tabs } from "@heroui/react";

import { deleteSystem } from "../_actions/deleteSystem";
import type { DomoticSystem } from "../_data/types";

export interface SystemDetailProps {
  system: DomoticSystem;
}

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
    <Card className="w-full rounded-2xl border border-border p-6 transition-colors">
      <Card.Header>
        <div className="flex items-center gap-2 text-muted">
          <Icon aria-hidden="true" className="size-5 text-accent" />
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
  const [isPending, startTransition] = useTransition();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = () => {
    setDeleteError(null);

    startTransition(async () => {
      const result = await deleteSystem(system.id);

      if (result && !result.ok) {
        setDeleteError(result.error ?? "No se pudo eliminar el sistema.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/domotica"
          className="inline-flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
          Volver al catálogo
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/domotica/${system.id}/editar`}
            className={buttonVariants({ size: "sm", variant: "secondary" })}
          >
            <Pencil aria-hidden="true" className="size-4" />
            Editar
          </Link>

          <AlertDialog>
            <Button variant="danger" size="sm">
              <Trash2 aria-hidden="true" className="size-4" />
              Eliminar
            </Button>

            <AlertDialog.Backdrop>
              <AlertDialog.Container>
                <AlertDialog.Dialog className="sm:max-w-[360px]">
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="danger" />
                    <AlertDialog.Heading>¿Eliminar este sistema?</AlertDialog.Heading>
                    <p className="mt-1.5 text-sm leading-5 text-muted">
                      Esta acción no se puede deshacer. Se eliminará &quot;
                      {system.name}&quot; y sus componentes.
                    </p>
                  </AlertDialog.Header>
                  {deleteError && (
                    <AlertDialog.Body>
                      <p className="text-sm text-danger">{deleteError}</p>
                    </AlertDialog.Body>
                  )}
                  <AlertDialog.Footer>
                    <Button slot="close" variant="secondary">
                      Cancelar
                    </Button>
                    <Button
                      isDisabled={isPending}
                      variant="danger"
                      onPress={handleDelete}
                    >
                      {isPending ? "Eliminando..." : "Eliminar"}
                    </Button>
                  </AlertDialog.Footer>
                </AlertDialog.Dialog>
              </AlertDialog.Container>
            </AlertDialog.Backdrop>
          </AlertDialog>
        </div>
      </div>

      <Card className="w-full rounded-2xl border border-border p-6">
        <Card.Content className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            {system.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={system.name}
                className="size-16 shrink-0 rounded-xl border border-border object-cover"
                src={system.imageUrl}
              />
            )}
            <div>
              <span className="text-xs font-semibold tracking-wider text-accent uppercase">
                {system.category}
              </span>
              <h1 className="mt-1 text-2xl font-bold text-foreground">
                {system.name}
              </h1>
            </div>
          </div>
          <Chip className="self-start sm:self-center" color="accent" variant="soft">
            {system.badge}
          </Chip>
        </Card.Content>
      </Card>

      <Tabs defaultSelectedKey="ficha">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Secciones del sistema">
            <Tabs.Tab id="ficha" className="data-[selected=true]:text-accent">
              <Info aria-hidden="true" className="size-4 mr-2" />
              Ficha
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="componentes" className="data-[selected=true]:text-accent">
              <Layers aria-hidden="true" className="size-4 mr-2" />
              Componentes
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>

        <Tabs.Panel className="mt-4 flex flex-col gap-4" id="ficha">
          <SectionCard icon={Target} title="Público objetivo">
            <p className="text-sm leading-relaxed text-muted">
              {system.targetAudience}
            </p>
          </SectionCard>

          <SectionCard icon={ShieldCheck} title="Necesidad que cubre">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {system.needsCovered.map((need) => (
                <li
                  key={need}
                  className="flex items-start gap-2.5 text-sm text-muted"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-success"
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
                  className={`text-sm ${idx < system.features.length - 1
                    ? "border-b border-border pb-2"
                    : ""
                    }`}
                >
                  <span className="font-semibold text-foreground">
                    {feature.label}:{" "}
                  </span>
                  <span className="text-muted">{feature.value}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard icon={Zap} title="Capacidad de carga">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {system.loadCapacity.map((load) => (
                <div
                  key={load.label}
                  className="rounded-xl border border-border bg-surface-secondary p-3.5"
                >
                  <div className="mb-1 text-xs font-semibold text-muted">
                    {load.label}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {load.value}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <Card className="w-full rounded-2xl border border-border p-6 transition-colors">
            <Card.Content className="space-y-6">
              <div>
                <div className="mb-4 flex items-center gap-2 text-muted">
                  <Wrench aria-hidden="true" className="size-5 text-accent" />
                  <span className="text-xs font-bold tracking-wider uppercase">
                    Preparación en obra
                  </span>
                </div>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {system.sitePreparation.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted"
                    >
                      <div className="size-1.5 shrink-0 rounded-full bg-accent/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border pt-4">
                <div className="mb-2 flex items-center gap-2 text-muted">
                  <HardDrive aria-hidden="true" className="size-5 text-accent" />
                  <span className="text-xs font-bold tracking-wider uppercase">
                    Instalación
                  </span>
                </div>
                <p className="text-sm text-muted">{system.installation}</p>
              </div>
            </Card.Content>
          </Card>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border border-accent/20 bg-accent-soft p-5">
              <div className="rounded-xl bg-accent/20 p-3 text-accent">
                <DollarSign aria-hidden="true" className="size-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-muted uppercase">
                  Inversión aprox.
                </div>
                <div className="text-lg font-bold text-foreground">
                  {system.investment}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface-secondary p-5">
              <div className="rounded-xl bg-default p-3 text-default-foreground">
                <Wrench aria-hidden="true" className="size-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-muted uppercase">
                  Mantenimiento
                </div>
                <div className="text-lg font-bold text-foreground">
                  {system.maintenance}
                </div>
              </div>
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel className="mt-4" id="componentes">
          <Card className="w-full rounded-2xl border border-border p-6 transition-colors">
            <Card.Header>
              <div className="flex items-center gap-2 text-muted">
                <Layers aria-hidden="true" className="size-5 text-accent" />
                <span className="text-xs font-bold tracking-wider uppercase">
                  Componentes del sistema
                </span>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-muted">
                  <thead className="border-b border-border bg-surface-secondary text-xs font-bold tracking-wider text-muted uppercase">
                    <tr>
                      <th className="px-4 py-3">Componente</th>
                      <th className="px-4 py-3">Categoría</th>
                      <th className="px-4 py-3 text-right">
                        Cantidad sugerida
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {system.components.map((component) => (
                      <tr
                        key={component.name}
                        className="transition-colors hover:bg-surface-secondary"
                      >
                        <td className="px-4 py-3.5 font-medium text-foreground">
                          {component.name}
                        </td>
                        <td className="px-4 py-3.5 text-muted">
                          {component.type}
                        </td>
                        <td className="px-4 py-3.5 text-right font-semibold text-accent">
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
    </div >
  );
}
