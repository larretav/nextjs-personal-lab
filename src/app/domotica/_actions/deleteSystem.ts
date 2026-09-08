"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/src/lib/supabase/admin";

const BUCKET = "system-images";

export interface DeleteSystemResult {
  ok: boolean;
  error?: string;
}

export async function deleteSystem(slug: string): Promise<DeleteSystemResult> {
  const cleanSlug = slug.trim().toLowerCase();

  if (!cleanSlug) {
    return { ok: false, error: "Falta el sistema a eliminar." };
  }

  const { data: system, error: fetchError } = await supabaseAdmin
    .from("systems")
    .select("id, image_path")
    .eq("slug", cleanSlug)
    .maybeSingle();

  if (fetchError) {
    return { ok: false, error: fetchError.message };
  }

  if (!system) {
    return { ok: false, error: "El sistema que intentás eliminar ya no existe." };
  }

  const { error: deleteComponentsError } = await supabaseAdmin
    .from("system_components")
    .delete()
    .eq("system_id", system.id);

  if (deleteComponentsError) {
    return { ok: false, error: deleteComponentsError.message };
  }

  const { error: deleteError } = await supabaseAdmin
    .from("systems")
    .delete()
    .eq("id", system.id);

  if (deleteError) {
    return { ok: false, error: deleteError.message };
  }

  if (system.image_path) {
    // Best-effort: the system row is already deleted either way.
    await supabaseAdmin.storage.from(BUCKET).remove([system.image_path]);
  }

  revalidatePath("/domotica");
  revalidatePath(`/domotica/${cleanSlug}`);

  redirect("/domotica");
}
