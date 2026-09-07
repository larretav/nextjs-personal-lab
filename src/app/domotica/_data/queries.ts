import { cache } from "react";

import { supabase } from "@/src/lib/supabase/client";
import type { Tables } from "@/src/lib/supabase/database.types";

import type { ComponentItem, DomoticSystem, FeatureItem } from "./types";

const IMAGES_BUCKET = "system-images";

function getImageUrl(imagePath: string | null): string | null {
  if (!imagePath) return null;

  return supabase.storage.from(IMAGES_BUCKET).getPublicUrl(imagePath).data.publicUrl;
}

function mapSystem(
  row: Tables<"systems">,
  categoryName: string,
  components: Tables<"system_components">[]
): DomoticSystem {
  return {
    id: row.slug,
    category: categoryName,
    name: row.name,
    badge: row.badge,
    imageUrl: getImageUrl(row.image_path),
    targetAudience: row.target_audience,
    needsCovered: (row.needs_covered as string[] | null) ?? [],
    features: (row.features as FeatureItem[] | null) ?? [],
    loadCapacity: (row.load_capacity as FeatureItem[] | null) ?? [],
    sitePreparation: (row.site_preparation as string[] | null) ?? [],
    installation: row.installation,
    investment: row.investment,
    maintenance: row.maintenance,
    components: components.map((c) => ({ name: c.name, type: c.type, qty: c.qty })),
  };
}

async function fetchCategoryNamesById(): Promise<Map<number, string>> {
  const { data, error } = await supabase.from("categories").select("id, name");

  if (error) throw error;

  return new Map((data ?? []).map((category) => [category.id, category.name]));
}

export const getSystemsList = cache(async (): Promise<DomoticSystem[]> => {
  const [systemsResult, componentsResult, categoryNamesById] = await Promise.all([
    supabase.from("systems").select("*").order("id"),
    supabase.from("system_components").select("*"),
    fetchCategoryNamesById(),
  ]);

  if (systemsResult.error) throw systemsResult.error;
  if (componentsResult.error) throw componentsResult.error;

  const componentsBySystemId = new Map<number, Tables<"system_components">[]>();

  for (const component of componentsResult.data ?? []) {
    const existing = componentsBySystemId.get(component.system_id) ?? [];

    existing.push(component);
    componentsBySystemId.set(component.system_id, existing);
  }

  return (systemsResult.data ?? []).map((row) =>
    mapSystem(
      row,
      categoryNamesById.get(row.category_id) ?? "",
      componentsBySystemId.get(row.id) ?? []
    )
  );
});

export const getSystemBySlug = cache(
  async (slug: string): Promise<DomoticSystem | null> => {
    const { data: row, error } = await supabase
      .from("systems")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (!row) return null;

    const [componentsResult, categoryNamesById] = await Promise.all([
      supabase.from("system_components").select("*").eq("system_id", row.id),
      fetchCategoryNamesById(),
    ]);

    if (componentsResult.error) throw componentsResult.error;

    return mapSystem(
      row,
      categoryNamesById.get(row.category_id) ?? "",
      componentsResult.data ?? []
    );
  }
);

export const getCategoryNames = cache(async (): Promise<string[]> => {
  const { data, error } = await supabase.from("categories").select("name").order("id");

  if (error) throw error;

  return (data ?? []).map((category) => category.name);
});

export const getCategories = cache(async (): Promise<Tables<"categories">[]> => {
  const { data, error } = await supabase.from("categories").select("*").order("name");

  if (error) throw error;

  return data ?? [];
});
