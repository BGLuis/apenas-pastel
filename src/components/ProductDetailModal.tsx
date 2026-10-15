"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Drawer } from "vaul";
import { X, Heart, Clock, Flame, Users, Check, Minus, Plus } from "lucide-react";
import { Product, ProductAddon } from "@/types";
import { PRODUCT_ADDONS } from "@/data/menu";
import { formatCurrency, cn } from "@/lib/utils";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useLocaleStore } from "@/store/useLocaleStore";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, addons: ProductAddon[], notes: string) => void;
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { locale, t } = useLocaleStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  // Reset state when opening a new product
  React.useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedAddonIds([]);
      setNotes("");
    }
  }, [product]);

  if (!product) return null;

  const favored = isFavorite(product.id);
  const name = locale === "en" ? product.nameEn : product.name;
  const description = locale === "en" ? product.descriptionEn : product.description;
  const liveBadge = locale === "en" ? (product.liveBadgeTextEn || product.liveBadgeText) : product.liveBadgeText;

  const toggleAddon = (id: string) => {
    if (selectedAddonIds.includes(id)) {
      setSelectedAddonIds(selectedAddonIds.filter((item) => item !== id));
    } else {
      if (selectedAddonIds.length < 2) {
        setSelectedAddonIds([...selectedAddonIds, id]);
      }
    }
  };

  const selectedAddons = PRODUCT_ADDONS.filter((a) => selectedAddonIds.includes(a.id));
  const addonsCost = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const itemTotal = (product.price + addonsCost) * quantity;

  const handleConfirm = () => {
    onAddToCart(product, quantity, selectedAddons, notes);
    onClose();
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 max-h-[92vh] max-w-lg mx-auto bg-brand-cream dark:bg-brand-dark-surface rounded-t-[32px] overflow-hidden flex flex-col focus:outline-none shadow-2xl border-t border-brand-cream-dark/50 dark:border-brand-dark-border">
          {/* Header Grab Handle */}
          <div className="w-full pt-3 pb-2 flex justify-center bg-transparent">
            <div className="w-12 h-1.5 rounded-full bg-brand-cream-dark dark:bg-brand-dark-border" />
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 px-5 pb-28">
            {/* Food Image with Close and Favorite actions */}
            <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden mb-4 shadow-md bg-brand-cream-dark/20">
              <Image
                src={product.image}
                alt={name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

              {/* Close & Favorite buttons */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md flex items-center justify-center text-brand-text-primary dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>

                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md flex items-center justify-center text-brand-red shadow-sm hover:scale-105 active:scale-95 transition-all"
                  aria-label="Favoritar"
                >
                  <Heart
                    className={cn(
                      "w-5 h-5 transition-colors",
                      favored ? "fill-brand-red text-brand-red" : "text-brand-text-primary dark:text-white"
                    )}
                  />
                </button>
              </div>

              {/* Price badge over photo bottom */}
              <div className="absolute bottom-3 right-3">
                <div className="px-3.5 py-1.5 rounded-lg bg-brand-yellow text-brand-text-primary font-display font-bold text-lg shadow-price flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-red" />
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            </div>

            {/* Product Title and Live Badge */}
            <div className="flex flex-col gap-2 mb-4">
              {liveBadge && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red text-white text-xs font-bold w-fit shadow-sm">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{liveBadge}</span>
                </div>
              )}
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-text-primary dark:text-brand-dark-text">
                {name}
              </h2>
              <p className="text-sm text-brand-text-secondary dark:text-brand-dark-secondary leading-relaxed">
                {description}
              </p>
            </div>

            {/* Quick Facts Row */}
            <div className="grid grid-cols-3 gap-2.5 py-3 px-4 rounded-2xl bg-white dark:bg-brand-dark-card border border-brand-cream-dark/50 dark:border-brand-dark-border mb-5">
              <div className="flex flex-col items-center text-center gap-1">
                <Clock className="w-4 h-4 text-brand-yellow" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-text-secondary dark:text-brand-dark-secondary">
                  {t.prepFact}
                </span>
                <span className="text-xs font-bold text-brand-text-primary dark:text-brand-dark-text">
                  {product.prepTime}
                </span>
              </div>

              <div className="flex flex-col items-center text-center gap-1 border-x border-brand-cream-dark/40 dark:border-brand-dark-border">
                <Flame className="w-4 h-4 text-brand-red" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-text-secondary dark:text-brand-dark-secondary">
                  {t.spicinessFact}
                </span>
                <span className="text-xs font-bold text-brand-text-primary dark:text-brand-dark-text capitalize">
                  {product.spiciness === "media" ? "Média" : product.spiciness === "baixa" ? "Baixa" : "Suave"}
                </span>
              </div>

              <div className="flex flex-col items-center text-center gap-1">
                <Users className="w-4 h-4 text-brand-yellow" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-text-secondary dark:text-brand-dark-secondary">
                  {t.servesFact}
                </span>
                <span className="text-xs font-bold text-brand-text-primary dark:text-brand-dark-text">
                  {product.serves}
                </span>
              </div>
            </div>

            {/* Addons Section */}
            {product.category === "salgados" && (
              <div className="flex flex-col gap-2.5 mb-5">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-base text-brand-text-primary dark:text-brand-dark-text">
                    {t.addonsTitle}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary dark:text-brand-dark-secondary">
                    {t.addonsSubtitle}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {PRODUCT_ADDONS.map((addon) => {
                    const isSelected = selectedAddonIds.includes(addon.id);
                    const addonName = locale === "en" ? addon.nameEn : addon.name;
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all",
                          isSelected
                            ? "bg-brand-yellow-light/40 dark:bg-brand-yellow/10 border-brand-red dark:border-brand-yellow"
                            : "bg-white dark:bg-brand-dark-card border-brand-cream-dark/50 dark:border-brand-dark-border"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-lg flex items-center justify-center transition-colors",
                              isSelected
                                ? "bg-brand-red text-white"
                                : "border border-brand-cream-dark dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface"
                            )}
                          >
                            {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                          <span className="text-sm font-semibold text-brand-text-primary dark:text-brand-dark-text">
                            {addonName}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-brand-text-secondary dark:text-brand-dark-secondary">
                          {addon.price > 0 ? `+ ${formatCurrency(addon.price)}` : t.free}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions Field */}
            <div className="flex flex-col gap-1.5 mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary dark:text-brand-dark-secondary">
                {t.notesLabel}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.notesPlaceholder}
                rows={2}
                className="w-full p-3 rounded-xl bg-white dark:bg-brand-dark-card border border-brand-cream-dark/60 dark:border-brand-dark-border text-sm text-brand-text-primary dark:text-brand-dark-text placeholder:text-brand-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all resize-none"
              />
            </div>
          </div>

          {/* Fixed Bottom Action Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-brand-dark-surface/95 backdrop-blur-md border-t border-brand-cream-dark/60 dark:border-brand-dark-border flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-brand-cream dark:bg-brand-dark-card border border-brand-cream-dark/50 dark:border-brand-dark-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-7 h-7 rounded-full bg-white dark:bg-brand-dark-surface flex items-center justify-center text-brand-text-primary dark:text-white disabled:opacity-40 transition-transform active:scale-90"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-display font-bold text-base text-brand-text-primary dark:text-brand-dark-text w-5 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-full bg-brand-red text-white flex items-center justify-center transition-transform active:scale-90"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={handleConfirm}
              className="flex-1 py-3.5 px-6 rounded-full bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm sm:text-base shadow-btn transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <span>{t.addToCart}</span>
              <span>·</span>
              <span>{formatCurrency(itemTotal)}</span>
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
