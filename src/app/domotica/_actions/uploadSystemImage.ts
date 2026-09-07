"use server";

import { revalidatePath } from "next/cache";

import { supabaseAdmin } from "@/src/lib/supabase/admin";

const BUCKET = "system-images";
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export interface UploadSystemImageResult {
  ok: boolean;
  error?: string;
  imagePath?: string;
}

export async function uploadSystemImage(
  formData: FormData
): Promise<UploadSystemImageResult> {
  const slug = formData.get("slug");
  const file = formData.get("file");

  if (typeof slug !== "string" || !slug) {
    return { ok: false, error: "Falta el sistema al que subir la imagen." };
  }

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Falta el archivo de imagen." };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { ok: false, error: "Formato no soportado. Usá JPG, PNG o WebP." };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { ok: false, error: "La imagen supera los 5 MB." };
  }

  const extension = file.type.split("/")[1];
  const imagePath = `${slug}.${extension}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(imagePath, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    return { ok: false, error: uploadError.message };
  }

  const { error: updateError } = await supabaseAdmin
    .from("systems")
    .update({ image_path: imagePath, updated_at: new Date().toISOString() })
    .eq("slug", slug);

  if (updateError) {
    return { ok: false, error: updateError.message };
  }

  revalidatePath("/domotica");
  revalidatePath(`/domotica/${slug}`);

  return { ok: true, imagePath };
}
