"use client";

import React from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { useLocaleStore } from "@/store/useLocaleStore";

interface LiveFryerSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
  onSeeAll?: () => void;
}

export function LiveFryerSection({
  products,
  onSelectProduct,
  onQuickAdd,
  onSeeAll,
}: LiveFryerSectionProps) {
  const { t } = useLocaleStore();

  const liveProducts = products.filter((p) => p.isLiveFryer);

  if (liveProducts.length === 0) return null;

  return (
    <section className="w-full py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-red dark:text-[#5CEE1B] mb-1">
              <span className="w-2 h-2 rounded-full bg-brand-red dark:bg-[#5CEE1B] animate-live-pulse" />
              <span>{t.liveFryerBadge}</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-text-primary dark:text-brand-dark-text">
              {t.liveFryerTitle}
            </h2>
          </div>

          {onSeeAll && (
            <button
              onClick={onSeeAll}
              className="text-sm font-bold text-brand-red dark:text-[#5CEE1B] hover:underline"
            >
              {t.seeAll}
            </button>
          )}
        </div>

        {/* Carousel */}
        <div className="flex items-center gap-3.5 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {liveProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="compact"
              onSelectProduct={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
