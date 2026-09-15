import type { ComponentItem } from "../_data/types";

export interface NormalizedComponent {
  name: string;
  type: string;
  qty: string;
  image_path: string | null;
}

export function normalizeComponents(
  items: ComponentItem[]
): { ok: true; components: NormalizedComponent[] } | { ok: false; error: string } {
  const components: NormalizedComponent[] = [];

  for (const item of items) {
    const name = item.name.trim();
    const type = item.type.trim();
    const qty = item.qty.trim();

    if (!name && !type && !qty) continue;

    if (!name) {
      return {
        ok: false,
        error: "Completá el nombre de cada componente, o dejá la fila vacía.",
      };
    }

    components.push({ name, type, qty, image_path: item.imagePath ?? null });
  }

  return { ok: true, components };
}
