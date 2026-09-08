"use server";

import { revalidatePath } from "next/cache";

import { supabaseAdmin } from "@/src/lib/supabase/admin";
import type { Json } from "@/src/lib/supabase/database.types";

import {
  INVESTMENT_LEVELS,
  MAINTENANCE_LEVELS,
  type FeatureItem,
} from "../_data/types";
import type { CreateSystemInput } from "./createSystem";

export interface UpdateSystemInput extends CreateSystemInput {
  originalSlug: string;
}

export interface UpdateSystemResult {
  ok: boolean;
  error?: string;
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function clean(values: string[]): string[] {
  return values.map((v) => v.trim()).filter((v) => v.length > 0);
}

function cleanPairs(values: FeatureItem[]): FeatureItem[] {
  return values
    .map((v) => ({ label: v.label.trim(), value: v.value.trim() }))
    .filter((v) => v.label.length > 0 && v.value.length > 0);
}

export async function updateSystem(
  input: UpdateSystemInput
): Promise<UpdateSystemResult> {
  const originalSlug = input.originalSlug.trim().toLowerCase();
  const slug = input.slug.trim().toLowerCase();

  if (!originalSlug) {
    return { ok: false, error: "Falta el sistema a editar." };
  }

  if (!SLUG_PATTERN.test(slug)) {
    return {
      ok: false,
      error: "El slug solo puede tener minúsculas, números y guiones (ej. mi-sistema).",
    };
  }

  if (!input.categoryId) {
    return { ok: false, error: "Elegí una categoría." };
  }

  if (!input.name.trim() || !input.badge.trim() || !input.targetAudience.trim()) {
    return { ok: false, error: "Faltan campos obligatorios de la ficha." };
  }

  if (!input.installation.trim()) {
    return { ok: false, error: "Falta la instalación." };
  }

  if (!INVESTMENT_LEVELS.includes(input.investment as (typeof INVESTMENT_LEVELS)[number])) {
    return { ok: false, error: "Elegí un nivel de inversión válido." };
  }

  if (!MAINTENANCE_LEVELS.includes(input.maintenance as (typeof MAINTENANCE_LEVELS)[number])) {
    return { ok: false, error: "Elegí un nivel de mantenimiento válido." };
  }

  const components = input.components
    .map((c) => ({ name: c.name.trim(), type: c.type.trim(), qty: c.qty.trim() }))
    .filter((c) => c.name.length > 0 && c.type.length > 0 && c.qty.length > 0);

  const { data: system, error: updateError } = await supabaseAdmin
    .from("systems")
    .update({
      slug,
      category_id: input.categoryId,
      name: input.name.trim(),
      badge: input.badge.trim(),
      target_audience: input.targetAudience.trim(),
      needs_covered: clean(input.needsCovered),
      features: cleanPairs(input.features) as unknown as Json,
      load_capacity: cleanPairs(input.loadCapacity) as unknown as Json,
      site_preparation: clean(input.sitePreparation),
      installation: input.installation.trim(),
      investment: input.investment.trim(),
      maintenance: input.maintenance.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("slug", originalSlug)
    .select("id")
    .maybeSingle();

  if (updateError) {
    if (updateError.code === "23505") {
      return {
        ok: false,
        error:
          "Ya existe un sistema con un nombre muy similar. Probá con un nombre más específico.",
      };
    }

    return { ok: false, error: updateError.message };
  }

  if (!system) {
    return { ok: false, error: "El sistema que intentás editar ya no existe." };
  }

  const { error: deleteComponentsError } = await supabaseAdmin
    .from("system_components")
    .delete()
    .eq("system_id", system.id);

  if (deleteComponentsError) {
    return { ok: false, error: deleteComponentsError.message };
  }

  if (components.length > 0) {
    const { error: componentsError } = await supabaseAdmin
      .from("system_components")
      .insert(components.map((c) => ({ system_id: system.id, ...c })));

    if (componentsError) {
      return { ok: false, error: componentsError.message };
    }
  }

  revalidatePath("/domotica");
  revalidatePath(`/domotica/${originalSlug}`);
  if (slug !== originalSlug) revalidatePath(`/domotica/${slug}`);

  return { ok: true };
}
