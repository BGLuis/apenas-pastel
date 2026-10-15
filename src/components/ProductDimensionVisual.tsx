"use client";

import React from "react";
import { Ruler, Scale, Sparkles, Droplets } from "lucide-react";
import { Product } from "@/types";
import { useLocaleStore } from "@/store/useLocaleStore";

interface ProductDimensionVisualProps {
  product: Product;
}

export function ProductDimensionVisual({ product }: ProductDimensionVisualProps) {
  const { locale, t } = useLocaleStore();
  const dim = product.dimensions;

  if (!dim) return null;

  const isDrink = product.category === "bebidas";
  const sizeLabel = locale === "en" ? (dim.sizeLabelEn || dim.sizeLabel) : dim.sizeLabel;

  if (isDrink && dim.volumeMl) {
    return (
      <div className="shrink-0 rounded-2xl bg-brand-cream/60 dark:bg-brand-dark-card border border-brand-cream-dark/60 dark:border-brand-dark-border p-3.5 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-text-secondary dark:text-brand-dark-secondary block">
              {t.dimensionVolume}
            </span>
            <span className="font-display font-bold text-sm text-brand-text-primary dark:text-brand-dark-text">
              {dim.volumeMl} ml · {sizeLabel}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Pastel dimensions
  return (
    <div className="shrink-0 rounded-2xl bg-brand-cream/60 dark:bg-brand-dark-card border border-brand-cream-dark/60 dark:border-brand-dark-border p-4 mb-5 flex flex-col gap-3">
      {/* Header with Title and Label */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-brand-text-primary dark:text-brand-dark-text">
          <Ruler className="w-4 h-4 text-brand-red dark:text-brand-yellow" />
          <span>{t.dimensionsTitle}</span>
        </div>
        {sizeLabel && (
          <span className="text-[11px] font-semibold text-brand-text-secondary dark:text-brand-dark-secondary bg-white dark:bg-brand-dark-surface px-2.5 py-0.5 rounded-full border border-brand-cream-dark/50 dark:border-brand-dark-border">
            {sizeLabel}
          </span>
        )}
      </div>

      {/* Blueprint Visual Representation */}
      <div className="relative p-4 rounded-xl bg-white dark:bg-brand-dark-surface border border-dashed border-brand-cream-dark dark:border-brand-dark-border/80 flex flex-col items-center justify-center">
        {/* Horizontal Dimension Arrow (Length) */}
        {dim.lengthCm && (
          <div className="w-full flex items-center justify-between text-[11px] font-bold text-brand-red dark:text-brand-yellow mb-1.5 px-4">
            <span className="text-[10px]">◀</span>
            <div className="flex-1 flex items-center gap-1.5 px-2">
              <div className="h-px bg-brand-red/40 dark:bg-brand-yellow/40 flex-1 border-t border-dashed border-brand-red/60 dark:border-brand-yellow/60" />
              <span className="whitespace-nowrap px-1 rounded bg-brand-yellow/20 dark:bg-brand-yellow/10 font-mono text-xs font-extrabold text-brand-red dark:text-brand-yellow">
                {dim.lengthCm} cm {t.dimensionLength.toLowerCase()}
              </span>
              <div className="h-px bg-brand-red/40 dark:bg-brand-yellow/40 flex-1 border-t border-dashed border-brand-red/60 dark:border-brand-yellow/60" />
            </div>
            <span className="text-[10px]">▶</span>
          </div>
        )}

        {/* Center: Pastel Silhouette & Vertical Arrow (Width) */}
        <div className="w-full flex items-center justify-between gap-3 my-1">
          {/* Stylized Pastel Blueprint Shape */}
          <div className="flex-1 h-20 sm:h-22 rounded-xl bg-gradient-to-r from-brand-yellow/25 via-brand-yellow/40 to-brand-yellow/25 dark:from-brand-yellow/10 dark:via-brand-yellow/20 dark:to-brand-yellow/10 border-2 border-brand-yellow dark:border-brand-yellow/60 relative overflow-hidden flex items-center justify-center shadow-xs">
            {/* Crimped crust edges (carretilha) */}
            <div className="absolute top-0 bottom-0 left-0 w-2.5 border-r border-dashed border-brand-yellow/70 dark:border-brand-yellow/40 bg-brand-yellow/20" />
            <div className="absolute top-0 bottom-0 right-0 w-2.5 border-l border-dashed border-brand-yellow/70 dark:border-brand-yellow/40 bg-brand-yellow/20" />

            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="font-display font-bold text-xs sm:text-sm text-brand-text-primary dark:text-brand-dark-text tracking-tight">
                {product.name}
              </span>
              <span className="text-[10px] text-brand-text-secondary dark:text-brand-dark-secondary italic flex items-center gap-1 mt-0.5">
                <Sparkles className="w-2.5 h-2.5 text-brand-yellow fill-brand-yellow" />
                <span>{t.crustNote}</span>
              </span>
            </div>
          </div>

          {/* Vertical Dimension Arrow (Width) */}
          {dim.widthCm && (
            <div className="flex flex-col items-center justify-between h-20 sm:h-22 text-[10px] font-bold text-brand-red dark:text-brand-yellow px-1">
              <span>▲</span>
              <div className="flex-1 w-px border-l border-dashed border-brand-red/60 dark:border-brand-yellow/60 my-0.5" />
              <span className="font-mono text-xs font-extrabold rotate-90 my-2 whitespace-nowrap text-brand-red dark:text-brand-yellow">
                {dim.widthCm} cm
              </span>
              <div className="flex-1 w-px border-l border-dashed border-brand-red/60 dark:border-brand-yellow/60 my-0.5" />
              <span>▼</span>
            </div>
          )}
        </div>

        {/* Bottom Specs: Weight Badge & Comparison */}
        {dim.weightGrams && (
          <div className="w-full flex items-center justify-between pt-2.5 mt-2 border-t border-brand-cream-dark/50 dark:border-brand-dark-border text-xs">
            <div className="flex items-center gap-1.5 font-bold text-brand-text-primary dark:text-brand-dark-text">
              <Scale className="w-3.5 h-3.5 text-brand-red dark:text-brand-yellow" />
              <span>{t.dimensionWeight}:</span>
              <span className="font-mono text-brand-red dark:text-brand-yellow font-extrabold text-sm">
                ~{dim.weightGrams}g
              </span>
            </div>

            <span className="text-[11px] text-brand-text-secondary dark:text-brand-dark-secondary font-medium">
              {t.dimensionComparison}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
