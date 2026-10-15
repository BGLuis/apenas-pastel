"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useLocaleStore } from "@/store/useLocaleStore";
import { formatCurrency } from "@/lib/utils";

interface FloatingCartBarProps {
  onOpenCart: () => void;
}

export function FloatingCartBar({ onOpenCart }: FloatingCartBarProps) {
  const { items, getSubtotal, getItemCount } = useCartStore();
  const { t } = useLocaleStore();

  const itemCount = getItemCount();
  const subtotal = getSubtotal();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-0 right-0 z-40 px-4 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          onClick={onOpenCart}
          className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-full bg-brand-red dark:bg-[#5CEE1B] text-white dark:text-brand-dark-bg shadow-floating hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          {/* Left: Miniatures and Price */}
          <div className="flex items-center gap-3">
            {/* Overlapping Circles */}
            <div className="flex -space-x-3 overflow-hidden">
              {items.slice(0, 3).map((item) => (
                <div
                  key={item.cartId}
                  className="relative w-8 h-8 rounded-full border-2 border-brand-red dark:border-[#5CEE1B] overflow-hidden bg-brand-cream"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Total and count */}
            <div className="flex flex-col text-left leading-tight">
              <span className="font-display font-bold text-base sm:text-lg">
                {formatCurrency(subtotal)}
              </span>
              <span className="text-xs text-brand-yellow-light dark:text-brand-dark-bg/80 font-medium">
                {itemCount} {itemCount === 1 ? "item" : t.floatingCartItems}
              </span>
            </div>
          </div>

          {/* Right: CTA & Arrow */}
          <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base pr-1">
            <span>{t.floatingCartView}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>
      </div>
    </div>
  );
}
