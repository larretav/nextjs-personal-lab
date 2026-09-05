"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, Card, Chip, Label, SearchField, ToggleButton } from "@heroui/react";

import type { DomoticSystem } from "../_data/systems";

export interface CatalogBrowserProps {
  systems: DomoticSystem[];
  categories: string[];
}

const ALL_CATEGORIES = "Todas";

const searchFieldVars =
  "[--field-background:#f8fafc] [--field-border:#e2e8f0] [--field-placeholder:#94a3b8] [--focus:#6366f1] dark:[--field-background:#0f172a] dark:[--field-border:#334155] dark:[--field-placeholder:#64748b]";

const toggleButtonVars =
  "border border-slate-200 dark:border-slate-700 [--toggle-button-bg:#ffffff] [--toggle-button-bg-hover:#f8fafc] [--toggle-button-fg:#64748b] [--toggle-button-bg-selected:#4f46e5] [--toggle-button-bg-selected-hover:#4338ca] [--toggle-button-fg-selected:#ffffff] dark:[--toggle-button-bg:#1e293b] dark:[--toggle-button-bg-hover:#334155] dark:[--toggle-button-fg:#94a3b8] dark:[--toggle-button-bg-selected:#6366f1] dark:[--toggle-button-bg-selected-hover:#818cf8]";

const badgeChipVars =
  "[--chip-bg:#f1f5f9] [--chip-fg:#475569] dark:[--chip-bg:#334155] dark:[--chip-fg:#cbd5e1]";

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
      <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <SearchField name="system-search" value={searchTerm} onChange={setSearchTerm}>
          <Label className="mb-2 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Buscar sistema domótico
          </Label>
          <SearchField.Group className={searchFieldVars}>
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
              className={toggleButtonVars}
              isSelected={selectedCategory === cat}
              onChange={(selected) => {
                if (selected) setSelectedCategory(cat);
              }}
            >
              {cat}
            </ToggleButton>
          ))}
        </div>
      </div>

      {filteredSystems.length === 0 ? (
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-slate-400">
            No hay sistemas que coincidan con esos criterios.
          </p>
          <Button size="sm" className={toggleButtonVars} onPress={clearFilters}>
            Quitar filtros
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredSystems.map((system) => (
            <Link
              key={system.id}
              href={`/domotica/${system.id}`}
              className="rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Card className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:border-indigo-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-500/40 dark:hover:bg-slate-700/50">
                <Card.Header className="flex-row items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-indigo-500">
                      {system.category}
                    </p>
                    <Card.Title className="mt-0.5 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {system.name}
                    </Card.Title>
                  </div>
                  <Chip size="sm" className={badgeChipVars}>
                    {system.badge}
                  </Chip>
                </Card.Header>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {hasActiveFilters && filteredSystems.length > 0 && (
        <p className="text-sm text-slate-400">
          {filteredSystems.length} de {systems.length} sistemas.
        </p>
      )}
    </div>
  );
}
