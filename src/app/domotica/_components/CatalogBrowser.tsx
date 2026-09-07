"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, Card, Chip, Label, SearchField, ToggleButton } from "@heroui/react";

import type { DomoticSystem } from "../_data/types";

export interface CatalogBrowserProps {
  systems: DomoticSystem[];
  categories: string[];
}

const ALL_CATEGORIES = "Todas";

export function CatalogBrowser({ systems, categories }: CatalogBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

  const filteredSystems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return systems.filter((system) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES || system.category === selectedCategory;
      const matchesSearch =
        term === "" ||
        system.name.toLowerCase().includes(term) ||
        system.category.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [systems, searchTerm, selectedCategory]);

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== ALL_CATEGORIES;

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(ALL_CATEGORIES);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="rounded-2xl border border-border">
        <Card.Content className="flex flex-col gap-4">
          <SearchField name="system-search" value={searchTerm} onChange={setSearchTerm} variant="secondary">
            <Label className="mb-2 block text-xs font-semibold tracking-wider text-muted uppercase ">
              Buscar sistema domótico
            </Label>
            <SearchField.Group >
              <SearchField.SearchIcon />
              <SearchField.Input
                className="w-full"
                placeholder="Ej. cámara, termostato, cerradura..."

              />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>

          <div className="flex flex-wrap gap-2">
            {[ALL_CATEGORIES, ...categories].map((cat) => (
              <ToggleButton
                key={cat}
                size="sm"
                className="[--toggle-button-bg-selected:var(--accent)] [--toggle-button-bg-selected-hover:var(--accent-hover)] [--toggle-button-fg-selected:var(--accent-foreground)]"
                isSelected={selectedCategory === cat}
                onChange={(selected) => {
                  if (selected) setSelectedCategory(cat);
                }}
              >
                {cat}
              </ToggleButton>
            ))}
          </div>
        </Card.Content>
      </Card>

      {filteredSystems.length === 0 ? (
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm text-muted">
            No hay sistemas que coincidan con esos criterios.
          </p>
          <Button size="sm" variant="secondary" onPress={clearFilters}>
            Quitar filtros
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredSystems.map((system) => (
            <Link
              key={system.id}
              href={`/domotica/${system.id}`}
              className="outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Card className="w-full rounded-xl border border-border px-4 py-3 transition-all hover:border-accent/40 hover:bg-accent-soft-hover">
                <Card.Header className="flex-row items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    {system.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        alt=""
                        className="size-10 shrink-0 rounded-lg border border-border object-cover"
                        src={system.imageUrl}
                      />
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-accent">
                        {system.category}
                      </p>
                      <Card.Title className="mt-0.5 truncate text-sm font-semibold">
                        {system.name}
                      </Card.Title>
                    </div>
                  </div>
                  <Chip size="sm" color="default" variant="soft">
                    {system.badge}
                  </Chip>
                </Card.Header>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {hasActiveFilters && filteredSystems.length > 0 && (
        <p className="text-sm text-muted">
          {filteredSystems.length} de {systems.length} sistemas.
        </p>
      )}
    </div>
  );
}
