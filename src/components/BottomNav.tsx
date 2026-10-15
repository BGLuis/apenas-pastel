"use client";

import React from "react";
import { UtensilsCrossed, Search, Clock, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useLocaleStore } from "@/store/useLocaleStore";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: "cardapio" | "buscar" | "pedidos";
  onTabChange: (tab: "cardapio" | "buscar" | "pedidos") => void;
  onOpenCart: () => void;
}

export function BottomNav({ activeTab, onTabChange, onOpenCart }: BottomNavProps) {
  const itemCount = useCartStore((state) => state.getItemCount());
  const { locale } = useLocaleStore();

  const labels = {
    cardapio: locale === "en" ? "Menu" : "Cardápio",
    buscar: locale === "en" ? "Search" : "Buscar",
    pedidos: locale === "en" ? "Orders" : "Pedidos",
    sacola: locale === "en" ? "Bag" : "Sacola",
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-brand-dark-surface/95 backdrop-blur-lg border-t border-brand-cream-dark/50 dark:border-brand-dark-border px-4 py-2 flex items-center justify-around shadow-floating">
      {/* Tab: Cardapio */}
      <button
        onClick={() => onTabChange("cardapio")}
        className={cn(
          "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all",
          activeTab === "cardapio"
            ? "bg-brand-red dark:bg-[#5CEE1B] text-white dark:text-brand-dark-bg font-bold shadow-xs"
            : "text-brand-text-secondary dark:text-brand-dark-secondary hover:text-brand-text-primary"
        )}
      >
        <UtensilsCrossed className="w-4 h-4" />
        <span className="text-xs">{labels.cardapio}</span>
      </button>

      {/* Tab: Buscar */}
      <button
        onClick={() => onTabChange("buscar")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all",
          activeTab === "buscar"
            ? "bg-brand-red dark:bg-[#5CEE1B] text-white dark:text-brand-dark-bg font-bold shadow-xs"
            : "text-brand-text-secondary dark:text-brand-dark-secondary hover:text-brand-text-primary"
        )}
      >
        <Search className="w-4 h-4" />
        <span className="text-xs">{labels.buscar}</span>
      </button>

      {/* Tab: Pedidos */}
      <button
        onClick={() => onTabChange("pedidos")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all",
          activeTab === "pedidos"
            ? "bg-brand-red dark:bg-[#5CEE1B] text-white dark:text-brand-dark-bg font-bold shadow-xs"
            : "text-brand-text-secondary dark:text-brand-dark-secondary hover:text-brand-text-primary"
        )}
      >
        <Clock className="w-4 h-4" />
        <span className="text-xs">{labels.pedidos}</span>
      </button>

      {/* Action: Sacola */}
      <button
        onClick={onOpenCart}
        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-brand-text-secondary dark:text-brand-dark-secondary hover:text-brand-text-primary transition-all"
      >
        <ShoppingBag className="w-4 h-4" />
        <span className="text-xs">{labels.sacola}</span>

        {itemCount > 0 && (
          <span className="absolute -top-1 right-1 px-1.5 py-0.5 rounded-full bg-brand-yellow text-brand-text-primary text-[10px] font-extrabold border-2 border-white dark:border-brand-dark-surface leading-none shadow-xs">
            {itemCount}
          </span>
        )}
      </button>
    </nav>
  );
}
