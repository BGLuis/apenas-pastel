"use client";

import React from "react";
import { Search, Heart } from "lucide-react";
import { ProductCategory } from "@/types";
import { useLocaleStore } from "@/store/useLocaleStore";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategory: ProductCategory | "all";
  onSelectCategory: (category: ProductCategory | "all") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showOnlyFavorites: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
}

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  showOnlyFavorites,
  onToggleFavorites,
  favoritesCount,
}: CategoryFilterProps) {
  const { t } = useLocaleStore();

  const categories: { id: ProductCategory | "all"; label: string }[] = [
    { id: "destaques", label: t.catDestaques },
    { id: "salgados", label: t.catSalgados },
    { id: "combos", label: t.catCombos },
    { id: "doces", label: t.catDoces },
    { id: "bebidas", label: t.catBebidas },
  ];

  return (
    <div className="sticky top-0 z-30 w-full bg-brand-cream/95 dark:bg-brand-dark-bg/95 backdrop-blur-md pt-4 pb-3 border-b border-brand-cream-dark/60 dark:border-brand-dark-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3">
        {/* Search input + Favorites toggle */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-secondary dark:text-brand-dark-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full h-11 pl-11 pr-4 rounded-full bg-white dark:bg-brand-dark-surface border border-brand-cream-dark dark:border-brand-dark-border text-sm text-brand-text-primary dark:text-brand-dark-text placeholder:text-brand-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow transition-all"
            />
          </div>

          {/* Favorites filter toggle */}
          <button
            onClick={onToggleFavorites}
            className={cn(
              "h-11 px-3.5 rounded-full flex items-center justify-center gap-1.5 border transition-all text-sm font-semibold",
              showOnlyFavorites
                ? "bg-brand-red text-white border-brand-red shadow-sm"
                : "bg-white dark:bg-brand-dark-surface text-brand-text-secondary dark:text-brand-dark-secondary border-brand-cream-dark dark:border-brand-dark-border hover:border-brand-red"
            )}
            title={t.favoritesOnly}
            aria-label={t.favoritesOnly}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-transform active:scale-125",
                showOnlyFavorites ? "fill-white" : ""
              )}
            />
            {favoritesCount > 0 && (
              <span className="text-xs font-bold">{favoritesCount}</span>
            )}
          </button>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id && !showOnlyFavorites;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={cn(
                  "whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all select-none",
                  isActive
                    ? "bg-brand-red text-white shadow-sm dark:bg-[#5CEE1B] dark:text-brand-dark-bg"
                    : "bg-white dark:bg-brand-dark-surface text-brand-text-primary dark:text-brand-dark-text border border-brand-cream-dark dark:border-brand-dark-border hover:bg-brand-cream/50"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
