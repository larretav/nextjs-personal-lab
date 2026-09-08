"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  Cpu,
  DollarSign,
  HardDrive,
  ImageOff,
  Info,
  Layers,
  Pencil,
  ShieldCheck,
  Target,
  Trash2,
  Wrench,
  Zap,
} from "lucide-react";
import { Accordion, AlertDialog, Button, buttonVariants, Card, Chip } from "@heroui/react";

import { deleteSystem } from "../_actions/deleteSystem";
import type { DomoticSystem } from "../_data/types";

export interface SystemDetailProps {
  system: DomoticSystem;
}

const LEVEL_STYLES: Record<
  string,
  { chip: "success" | "warning" | "danger"; tile: string; icon: string }
> = {
  Baja: {
    chip: "success",
    tile: "border-success/15 bg-success-soft/20",
    icon: "bg-success/20 text-success",
  },
  Media: {
    chip: "warning",
    tile: "border-warning/15 bg-warning-soft/20",
    icon: "bg-warning/20 text-warning",
  },
  Alta: {
    chip: "danger",
    tile: "border-danger/15 bg-danger-soft/20",
    icon: "bg-danger/20 text-danger",
  },
};

const DEFAULT_LEVEL_STYLE = {
  chip: "default" as const,
  tile: "border-border bg-surface-secondary",
  icon: "bg-default text-default-foreground",
};

function levelStyle(level: string) {
  return LEVEL_STYLES[level] ?? DEFAULT_LEVEL_STYLE;
}

function AccordionSection({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion.Item id={id}>
      <Accordion.Heading>
        <Accordion.Trigger className="rounded-xl" >
          <span className="flex items-center gap-2">
            <Icon aria-hidden="true" className="size-5 text-accent" />
            <span className="text-sm font-bold tracking-wider uppercase">
              {title}
            </span>
          </span>
          <Accordion.Indicator />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body className="flex flex-col gap-4">
          {children}
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  );
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

      <Card className="w-full overflow-hidden rounded-2xl border border-border p-0">
        <Card.Content className="grid grid-cols-1 gap-0 sm:grid-cols-3">
          {system.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={system.name}
              className="h-40 w-full object-cover sm:h-auto"
              src={system.imageUrl}
            />
          ) : (
            <div className="flex h-40 items-center justify-center bg-surface-secondary text-muted sm:h-auto">
              <ImageOff aria-hidden="true" className="size-8" />
            </div>
          )}
          <div className="flex flex-col justify-center p-6 sm:col-span-2">
            <span className="text-xs font-semibold tracking-wider text-accent uppercase">
              {system.category}
            </span>
            <h1 className="mt-1 text-2xl font-bold text-foreground">
              {system.name}
            </h1>
          </div>
        </Card.Content>
      </Card>

      <div className="flex flex-col gap-4">
        <Accordion
          defaultExpandedKeys={["ficha"]}
          variant="surface"
          className="w-full overflow-hidden rounded-2xl border border-border"
        >
          <AccordionSection id="ficha" icon={Info} title="Ficha">
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
              <div
                className={`flex items-center gap-4 rounded-2xl border p-5 ${levelStyle(system.investment).tile}`}
              >
                <div className={`rounded-xl p-3 ${levelStyle(system.investment).icon}`}>
                  <DollarSign aria-hidden="true" className="size-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted uppercase">
                    Inversión aprox.
                  </div>
                  <Chip
                    className="mt-1"
                    color={levelStyle(system.investment).chip}
                    variant="soft"
                  >
                    {system.investment}
                  </Chip>
                </div>
              </div>

              <div
                className={`flex items-center gap-4 rounded-2xl border p-5 ${levelStyle(system.maintenance).tile}`}
              >
                <div className={`rounded-xl p-3 ${levelStyle(system.maintenance).icon}`}>
                  <Wrench aria-hidden="true" className="size-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted uppercase">
                    Mantenimiento
                  </div>
                  <Chip
                    className="mt-1"
                    color={levelStyle(system.maintenance).chip}
                    variant="soft"
                  >
                    {system.maintenance}
                  </Chip>
                </div>
              </div>
            </div>
          </AccordionSection>
        </Accordion>

        <Accordion
          variant="surface"
          className="w-full overflow-hidden rounded-2xl border border-border"
        >
          <AccordionSection id="componentes" icon={Layers} title="Componentes">
            {system.components.length === 0 ? (
              <p className="text-sm text-muted">
                Este sistema todavía no tiene componentes cargados.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {system.components.map((component, index) => (
                  <Card
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${component.name}-${index}`}
                    className="rounded-xl border border-border p-3 transition-colors hover:border-accent/40"
                  >
                    <Card.Content className="flex flex-col items-center gap-2 text-center">
                      {component.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          alt={component.name}
                          className="size-16 rounded-lg border border-border object-cover"
                          src={component.imageUrl}
                        />
                      ) : (
                        <div className="flex size-16 items-center justify-center rounded-lg border border-dashed border-border text-muted">
                          <ImageOff aria-hidden="true" className="size-6" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {component.name}
                        </p>
                        <p className="text-xs text-muted">{component.type}</p>
                      </div>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            )}
          </AccordionSection>
        </Accordion>
      </div>
    </div>
  );
}
