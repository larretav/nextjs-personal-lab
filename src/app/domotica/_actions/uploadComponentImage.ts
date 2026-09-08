"use server";

import { supabaseAdmin } from "@/src/lib/supabase/admin";

const BUCKET = "system-images";
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export interface UploadComponentImageResult {
  ok: boolean;
  error?: string;
  imagePath?: string;
}

export async function uploadComponentImage(
  formData: FormData
): Promise<UploadComponentImageResult> {
  const file = formData.get("file");

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
  const imagePath = `components/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(imagePath, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    return { ok: false, error: uploadError.message };
  }

  return { ok: true, imagePath };
}
