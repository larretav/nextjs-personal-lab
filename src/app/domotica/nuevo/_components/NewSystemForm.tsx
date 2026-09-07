"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";
import imageCompression from "browser-image-compression";
import { ImagePlus, Plus, X } from "lucide-react";

import { createSystem } from "../../_actions/createSystem";
import { uploadSystemImage } from "../../_actions/uploadSystemImage";
import type { ComponentItem, FeatureItem } from "../../_data/types";
import type { Tables } from "@/src/lib/supabase/database.types";

const MAX_IMAGE_SIZE_MB = 1;

export interface NewSystemFormProps {
  categories: Tables<"categories">[];
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function RepeatingRows<T>({
  label,
  rows,
  emptyRow,
  onChange,
  renderRow,
}: {
  label: string;
  rows: T[];
  emptyRow: T;
  onChange: (rows: T[]) => void;
  renderRow: (row: T, onChangeRow: (value: T) => void) => React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => onChange([...rows, emptyRow])}
        >
          <Plus aria-hidden="true" className="size-4" />
          Agregar
        </Button>
      </div>
      <div className="space-y-2">
        {rows.map((row, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="flex items-center gap-2">
            <div className="flex-1">
              {renderRow(row, (value) => {
                const next = [...rows];

                next[index] = value;
                onChange(next);
              })}
            </div>
            <Button
              aria-label={`Quitar fila de ${label.toLowerCase()}`}
              className="shrink-0"
              isIconOnly
              size="sm"
              variant="ghost"
              onPress={() => onChange(rows.filter((_, i) => i !== index))}
            >
              <X aria-hidden="true" className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NewSystemForm({ categories }: NewSystemFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(
    categories[0]?.id ?? null
  );
  const [name, setName] = useState("");
  const [badge, setBadge] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [installation, setInstallation] = useState("");
  const [investment, setInvestment] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [needsCovered, setNeedsCovered] = useState<string[]>([""]);
  const [sitePreparation, setSitePreparation] = useState<string[]>([""]);
  const [features, setFeatures] = useState<FeatureItem[]>([{ label: "", value: "" }]);
  const [loadCapacity, setLoadCapacity] = useState<FeatureItem[]>([
    { label: "", value: "" },
  ]);
  const [components, setComponents] = useState<ComponentItem[]>([
    { name: "", type: "", qty: "" },
  ]);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isCompressingImage, setIsCompressingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

  const handleImageSelected = async (file: File | undefined) => {
    if (!file) return;

    setImageError(null);
    setIsCompressingImage(true);

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: MAX_IMAGE_SIZE_MB,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      setImageFile(compressed);
      setImagePreviewUrl((previous) => {
        if (previous) URL.revokeObjectURL(previous);

        return URL.createObjectURL(compressed);
      });
    } catch {
      setImageError("No se pudo procesar la imagen. Probá con otro archivo.");
    } finally {
      setIsCompressingImage(false);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreviewUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);

      return null;
    });
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await createSystem({
        slug,
        categoryId: categoryId ?? 0,
        name,
        badge,
        targetAudience,
        installation,
        investment,
        maintenance,
        needsCovered,
        sitePreparation,
        features,
        loadCapacity,
        components,
      });

      if (!result.ok) {
        setError(result.error ?? "No se pudo crear el sistema.");
        return;
      }

      if (imageFile) {
        const imageFormData = new FormData();

        imageFormData.append("slug", slug);
        imageFormData.append("file", imageFile, imageFile.name);
        // Best-effort: the system itself was created successfully either way.
        await uploadSystemImage(imageFormData);
      }

      router.push(`/domotica/${slug}`);
    });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {error && (
        <div className="rounded-xl border border-danger/30 bg-danger-soft p-4 text-sm text-danger-soft-foreground">
          {error}
        </div>
      )}

      <Card className="w-full rounded-2xl border border-border p-6">
        <Card.Content className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField isRequired className="sm:col-span-2">
            <Label>Nombre</Label>
            <Input
              placeholder="Ej. Cámara de videovigilancia PoE - Ubiquiti"
              value={name}
              variant="secondary"
              onChange={(e) => {
                setName(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
            />
          </TextField>

          <TextField isRequired>
            <Label>Slug (para la URL)</Label>
            <Input
              placeholder="ej-mi-sistema"
              value={slug}
              variant="secondary"
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
            />
          </TextField>

          <Select
            selectedKey={categoryId}
            variant="secondary"
            onSelectionChange={(key) => setCategoryId(Number(key))}
          >
            <Label>Categoría</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {categories.map((category) => (
                  <ListBoxItem key={category.id} id={category.id} textValue={category.name}>
                    {category.name}
                  </ListBoxItem>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <TextField isRequired>
            <Label>Badge</Label>
            <Input
              placeholder="Ej. Inalámbrico"
              value={badge}
              variant="secondary"
              onChange={(e) => setBadge(e.target.value)}
            />
          </TextField>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label>Imagen</Label>
            <input
              ref={imageInputRef}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              type="file"
              onChange={(e) => handleImageSelected(e.target.files?.[0])}
            />
            <div className="flex items-center gap-3">
              {imagePreviewUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt="Vista previa"
                  className="size-16 shrink-0 rounded-xl border border-border object-cover"
                  src={imagePreviewUrl}
                />
              )}
              <Button
                isDisabled={isCompressingImage}
                type="button"
                variant="secondary"
                onPress={() => imageInputRef.current?.click()}
              >
                <ImagePlus aria-hidden="true" className="size-4" />
                {isCompressingImage
                  ? "Comprimiendo..."
                  : imageFile
                    ? "Cambiar imagen"
                    : "Elegir imagen"}
              </Button>
              {imageFile && (
                <Button type="button" variant="ghost" onPress={clearImage}>
                  Quitar
                </Button>
              )}
            </div>
            {imageFile && !imageError && (
              <p className="text-xs text-muted">
                {(imageFile.size / (1024 * 1024)).toFixed(2)} MB (máx.{" "}
                {MAX_IMAGE_SIZE_MB} MB)
              </p>
            )}
            {imageError && <p className="text-xs text-danger">{imageError}</p>}
          </div>

          <TextField isRequired className="sm:col-span-2">
            <Label>Público objetivo</Label>
            <TextArea
              placeholder="Ej. Viviendas unifamiliares que requieren videovigilancia permanente."
              value={targetAudience}
              variant="secondary"
              onChange={(e) => setTargetAudience(e.target.value)}
            />
          </TextField>

          <TextField isRequired>
            <Label>Instalación</Label>
            <TextArea
              placeholder="Ej. Fija, sobre muro o techo."
              value={installation}
              variant="secondary"
              onChange={(e) => setInstallation(e.target.value)}
            />
          </TextField>

          <TextField isRequired>
            <Label>Inversión aprox.</Label>
            <Input
              placeholder="Ej. Media"
              value={investment}
              variant="secondary"
              onChange={(e) => setInvestment(e.target.value)}
            />
          </TextField>

          <TextField isRequired>
            <Label>Mantenimiento</Label>
            <Input
              placeholder="Ej. Baja"
              value={maintenance}
              variant="secondary"
              onChange={(e) => setMaintenance(e.target.value)}
            />
          </TextField>
        </Card.Content>
      </Card>

      <Card className="w-full rounded-2xl border border-border p-6">
        <Card.Content className="flex flex-col gap-5">
          <RepeatingRows
            label="Necesidad que cubre"
            rows={needsCovered}
            emptyRow=""
            onChange={setNeedsCovered}
            renderRow={(value, onChangeRow) => (
              <Input
                aria-label="Necesidad"
                placeholder="Ej. Vigilancia de accesos"
                value={value}
                variant="secondary"
                onChange={(e) => onChangeRow(e.target.value)}
              />
            )}
          />

          <RepeatingRows
            label="Preparación en obra"
            rows={sitePreparation}
            emptyRow=""
            onChange={setSitePreparation}
            renderRow={(value, onChangeRow) => (
              <Input
                aria-label="Preparación"
                placeholder="Ej. Punto de red cercano al dispositivo"
                value={value}
                variant="secondary"
                onChange={(e) => onChangeRow(e.target.value)}
              />
            )}
          />

          <RepeatingRows
            label="Características"
            rows={features}
            emptyRow={{ label: "", value: "" }}
            onChange={setFeatures}
            renderRow={(item, onChangeRow) => (
              <div className="flex gap-2">
                <Input
                  aria-label="Etiqueta"
                  className="w-2/5"
                  placeholder="Ej. Comunicación"
                  value={item.label}
                  variant="secondary"
                  onChange={(e) => onChangeRow({ ...item, label: e.target.value })}
                />
                <Input
                  aria-label="Valor"
                  className="flex-1"
                  placeholder="Ej. Wi-Fi 2.4 GHz"
                  value={item.value}
                  variant="secondary"
                  onChange={(e) => onChangeRow({ ...item, value: e.target.value })}
                />
              </div>
            )}
          />

          <RepeatingRows
            label="Capacidad de carga"
            rows={loadCapacity}
            emptyRow={{ label: "", value: "" }}
            onChange={setLoadCapacity}
            renderRow={(item, onChangeRow) => (
              <div className="flex gap-2">
                <Input
                  aria-label="Etiqueta"
                  className="w-2/5"
                  placeholder="Ej. Carga eléctrica"
                  value={item.label}
                  variant="secondary"
                  onChange={(e) => onChangeRow({ ...item, label: e.target.value })}
                />
                <Input
                  aria-label="Valor"
                  className="flex-1"
                  placeholder="Ej. Aproximadamente 4 W"
                  value={item.value}
                  variant="secondary"
                  onChange={(e) => onChangeRow({ ...item, value: e.target.value })}
                />
              </div>
            )}
          />

          <RepeatingRows
            label="Componentes"
            rows={components}
            emptyRow={{ name: "", type: "", qty: "" }}
            onChange={setComponents}
            renderRow={(item, onChangeRow) => (
              <div className="flex gap-2">
                <Input
                  aria-label="Nombre del componente"
                  className="flex-1"
                  placeholder="Ej. Sensor de movimiento"
                  value={item.name}
                  variant="secondary"
                  onChange={(e) => onChangeRow({ ...item, name: e.target.value })}
                />
                <Input
                  aria-label="Categoría del componente"
                  className="flex-1"
                  placeholder="Ej. Dispositivo final"
                  value={item.type}
                  variant="secondary"
                  onChange={(e) => onChangeRow({ ...item, type: e.target.value })}
                />
                <Input
                  aria-label="Cantidad sugerida"
                  className="w-1/4"
                  placeholder="Ej. 1"
                  value={item.qty}
                  variant="secondary"
                  onChange={(e) => onChangeRow({ ...item, qty: e.target.value })}
                />
              </div>
            )}
          />
        </Card.Content>
      </Card>

      <div className="flex justify-end gap-3">
        <Button isDisabled={isPending} type="submit" variant="primary">
          {isPending ? "Guardando..." : "Crear sistema"}
        </Button>
      </div>
    </form>
  );
}
