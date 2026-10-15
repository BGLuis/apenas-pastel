"use client";

import React from "react";
import Image from "next/image";
import { Plus, Heart, Clock, Flame } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency, cn } from "@/lib/utils";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useLocaleStore } from "@/store/useLocaleStore";

interface ProductCardProps {
  product: Product;
  variant?: "vertical" | "compact" | "horizontal" | "combo";
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
}

export function ProductCard({
  product,
  variant = "vertical",
  onSelectProduct,
  onQuickAdd,
}: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { locale } = useLocaleStore();
  const favored = isFavorite(product.id);

  const name = locale === "en" ? product.nameEn : product.name;
  const description = locale === "en" ? product.descriptionEn : product.description;
  const badge = locale === "en" ? (product.badgeEn || product.badge) : product.badge;

  // --- VARIANT 1: COMBO BANNER ---
  if (variant === "combo") {
    return (
      <div
        onClick={() => onSelectProduct(product)}
        className="group relative cursor-pointer overflow-hidden rounded-3xl bg-brand-red dark:bg-brand-dark-card text-white p-6 sm:p-8 shadow-card border border-brand-cream-dark/20 transition-all hover:shadow-floating"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex flex-col gap-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-yellow">
              {badge || "Combo da feira"}
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {name}
            </h3>
            <p className="text-sm sm:text-base text-brand-yellow-light/90 max-w-md">
              {description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="px-4 py-2 rounded-xl bg-brand-yellow text-brand-text-primary font-display font-bold text-xl shadow-price flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-red" />
                <span>{formatCurrency(product.price)}</span>
              </div>
              {product.originalPrice && (
                <span className="line-through text-white/60 font-semibold text-sm sm:text-base">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="md:col-span-5 relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-inner">
            <Image
              src={product.image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    );
  }

  // --- VARIANT 2: COMPACT CARD (Carousel) ---
  if (variant === "compact") {
    return (
      <div
        onClick={() => onSelectProduct(product)}
        className="group cursor-pointer flex-shrink-0 w-40 sm:w-44 rounded-2xl bg-white dark:bg-brand-dark-surface p-2.5 shadow-card hover:shadow-floating border border-brand-cream-dark/50 dark:border-brand-dark-border transition-all flex flex-col justify-between"
      >
        {/* Photo + Quick Add Button */}
        <div className="relative w-full h-28 rounded-xl overflow-hidden mb-2.5 bg-brand-cream-dark/20">
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={(e) => onQuickAdd(product, e)}
            className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
            title="Adicionar à sacola"
            aria-label="Adicionar à sacola"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <h4 className="font-display font-bold text-sm text-brand-text-primary dark:text-brand-dark-text truncate">
            {name}
          </h4>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-brand-red dark:text-brand-yellow">
              {formatCurrency(product.price)}
            </span>
            <span className="text-[11px] text-brand-text-secondary dark:text-brand-dark-secondary">
              {product.prepTime}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // --- VARIANT 3: HORIZONTAL CARD (Doces & Bebidas) ---
  if (variant === "horizontal") {
    return (
      <div
        onClick={() => onSelectProduct(product)}
        className="group cursor-pointer rounded-2xl bg-white dark:bg-brand-dark-surface p-4 shadow-card hover:shadow-floating border border-brand-cream-dark/50 dark:border-brand-dark-border transition-all flex items-center justify-between gap-4"
      >
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          {badge && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-yellow-badge bg-brand-red/90 dark:bg-brand-yellow/20 dark:text-brand-yellow px-2 py-0.5 rounded-full w-fit">
              {badge}
            </span>
          )}
          <h3 className="font-display font-bold text-base sm:text-lg text-brand-text-primary dark:text-brand-dark-text truncate">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-brand-text-secondary dark:text-brand-dark-secondary line-clamp-2">
            {description}
          </p>
          <div className="font-display font-bold text-base text-brand-red dark:text-brand-yellow pt-1">
            {formatCurrency(product.price)}
          </div>
        </div>

        {/* Photo + Quick Add Button */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-brand-cream-dark/20">
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={(e) => onQuickAdd(product, e)}
            className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
            title="Adicionar à sacola"
            aria-label="Adicionar à sacola"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    );
  }

  // --- VARIANT 4: VERTICAL CARD (Default / Salgados) ---
  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group cursor-pointer rounded-3xl bg-white dark:bg-brand-dark-surface overflow-hidden shadow-card hover:shadow-floating border border-brand-cream-dark/50 dark:border-brand-dark-border transition-all flex flex-col"
    >
      {/* Photo with Overlay, Badge, Price, Favorite */}
      <div className="relative w-full aspect-[16/11] sm:aspect-[4/3] overflow-hidden bg-brand-cream-dark/20">
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges: Mais Pedido + Favorite */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {badge ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-yellow text-brand-text-primary text-xs font-bold shadow-sm">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{badge}</span>
            </span>
          ) : (
            <div />
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className="w-9 h-9 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md flex items-center justify-center text-brand-red transition-transform active:scale-125 hover:bg-white"
            aria-label="Favoritar"
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                favored ? "fill-brand-red text-brand-red" : "text-brand-text-primary dark:text-white"
              )}
            />
          </button>
        </div>

        {/* Bottom Tag: Price */}
        <div className="absolute bottom-3 left-3">
          <div className="px-3 py-1 rounded-lg bg-brand-yellow text-brand-text-primary font-display font-bold text-base shadow-price flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            <span>{formatCurrency(product.price)}</span>
          </div>
        </div>
      </div>

      {/* Info & Footer */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-brand-text-primary dark:text-brand-dark-text mb-1 group-hover:text-brand-red dark:group-hover:text-brand-yellow transition-colors">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-brand-text-secondary dark:text-brand-dark-secondary line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Footer: Prep Time & Quick Add */}
        <div className="flex items-center justify-between pt-2 border-t border-brand-cream-dark/40 dark:border-brand-dark-border">
          <div className="flex items-center gap-1.5 text-xs font-medium text-brand-text-secondary dark:text-brand-dark-secondary">
            <Clock className="w-3.5 h-3.5" />
            <span>Frita em {product.prepTime}</span>
          </div>

          <button
            onClick={(e) => onQuickAdd(product, e)}
            className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center shadow-btn hover:bg-brand-red-hover active:scale-95 transition-all"
            title="Adicionar à sacola"
            aria-label="Adicionar à sacola"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
