"use client";

import React from "react";
import Image from "next/image";
import { Drawer } from "vaul";
import { X, Bike, Store, Plus, Minus, ArrowRight, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useLocaleStore } from "@/store/useLocaleStore";
import { PRODUCTS } from "@/data/menu";
import { formatCurrency, cn } from "@/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  onProceedToCheckout,
}: CartDrawerProps) {
  const {
    items,
    deliveryType,
    setDeliveryType,
    updateQuantity,
    clearCart,
    getSubtotal,
    getDeliveryFee,
    getTotal,
    getItemCount,
    getFreeDeliveryRemaining,
    addItem,
  } = useCartStore();

  const { locale, t } = useLocaleStore();

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();
  const itemCount = getItemCount();
  const remainingForFree = getFreeDeliveryRemaining();
  const progressPercent = Math.min(100, Math.round((subtotal / 40.0) * 100));

  // Upsell suggestions (items not currently in cart)
  const upsellProducts = PRODUCTS.filter(
    (p) => !items.some((item) => item.product.id === p.id)
  ).slice(0, 3);

  const handleCheckoutClick = () => {
    onClose();
    onProceedToCheckout();
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 max-h-[94vh] max-w-lg mx-auto bg-brand-cream dark:bg-brand-dark-surface rounded-t-[32px] overflow-hidden flex flex-col focus:outline-none shadow-2xl border-t border-brand-cream-dark/50 dark:border-brand-dark-border">
          {/* Header Grab Handle */}
          <div className="w-full pt-3 pb-1 flex justify-center bg-transparent">
            <div className="w-12 h-1.5 rounded-full bg-brand-cream-dark dark:bg-brand-dark-border" />
          </div>

          {/* App Bar */}
          <div className="px-5 py-3 flex items-center justify-between border-b border-brand-cream-dark/40 dark:border-brand-dark-border">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white dark:bg-brand-dark-card flex items-center justify-center text-brand-text-primary dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all"
                aria-label="Fechar sacola"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h2 className="font-display font-bold text-xl text-brand-text-primary dark:text-brand-dark-text">
                  {t.cartTitle}
                </h2>
                <p className="text-xs text-brand-text-secondary dark:text-brand-dark-secondary">
                  {itemCount} {itemCount === 1 ? "item" : t.floatingCartItems} · {t.cartSubtitle}
                </p>
              </div>
            </div>

            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-bold text-brand-red dark:text-brand-yellow hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.clearCart}</span>
              </button>
            )}
          </div>

          {/* Content Body */}
          <div className="overflow-y-auto flex-1 px-5 py-4 pb-32 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-brand-cream-dark/40 flex items-center justify-center text-brand-red dark:text-brand-yellow text-2xl">
                  🥟
                </div>
                <h3 className="font-display font-bold text-lg text-brand-text-primary dark:text-brand-dark-text">
                  {t.emptyCartTitle}
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-secondary dark:text-brand-dark-secondary max-w-xs">
                  {t.emptyCartDesc}
                </p>
              </div>
            ) : (
              <>
                {/* Segmented Delivery vs Pickup */}
                <div className="p-1 rounded-full bg-brand-cream-dark/40 dark:bg-brand-dark-card flex items-center gap-1 border border-brand-cream-dark/40 dark:border-brand-dark-border">
                  <button
                    onClick={() => setDeliveryType("delivery")}
                    className={cn(
                      "flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all",
                      deliveryType === "delivery"
                        ? "bg-white dark:bg-brand-dark-surface text-brand-red dark:text-[#5CEE1B] shadow-sm"
                        : "text-brand-text-secondary dark:text-brand-dark-secondary hover:text-brand-text-primary"
                    )}
                  >
                    <Bike className="w-4 h-4" />
                    <span>{t.deliveryOption}</span>
                  </button>
                  <button
                    onClick={() => setDeliveryType("pickup")}
                    className={cn(
                      "flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all",
                      deliveryType === "pickup"
                        ? "bg-white dark:bg-brand-dark-surface text-brand-red dark:text-[#5CEE1B] shadow-sm"
                        : "text-brand-text-secondary dark:text-brand-dark-secondary hover:text-brand-text-primary"
                    )}
                  >
                    <Store className="w-4 h-4" />
                    <span>{t.pickupOption}</span>
                  </button>
                </div>

                {/* Free Delivery Progress Banner */}
                {deliveryType === "delivery" && (
                  <div className="p-3.5 rounded-2xl bg-brand-yellow-light/60 dark:bg-brand-yellow/15 border border-brand-yellow/40 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-brand-text-primary dark:text-brand-dark-text">
                      <Bike className="w-4 h-4 text-brand-red dark:text-brand-yellow flex-shrink-0" />
                      <span>
                        {remainingForFree > 0 ? (
                          <>
                            {t.freeDeliveryPrefix}{" "}
                            <span className="font-extrabold text-brand-red dark:text-brand-yellow">
                              {formatCurrency(remainingForFree)}
                            </span>{" "}
                            {t.freeDeliverySuffix}
                          </>
                        ) : (
                          t.freeDeliveryAchieved
                        )}
                      </span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="w-full h-2 rounded-full bg-white/70 dark:bg-black/40 overflow-hidden">
                      <div
                        className="h-full bg-brand-red dark:bg-brand-yellow rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Cart Items List */}
                <div className="rounded-2xl bg-white dark:bg-brand-dark-card border border-brand-cream-dark/50 dark:border-brand-dark-border divide-y divide-brand-cream-dark/30 dark:divide-brand-dark-border/50 overflow-hidden shadow-sm">
                  {items.map((item) => {
                    const itemName = locale === "en" ? item.product.nameEn : item.product.name;
                    return (
                      <div key={item.cartId} className="p-3.5 flex items-center gap-3">
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-brand-cream-dark/20">
                          <Image
                            src={item.product.image}
                            alt={itemName}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                          <h4 className="font-display font-bold text-sm text-brand-text-primary dark:text-brand-dark-text truncate">
                            {itemName}
                          </h4>

                          {/* Addons and Notes */}
                          {(item.selectedAddons.length > 0 || item.notes) && (
                            <p className="text-xs text-brand-text-secondary dark:text-brand-dark-secondary truncate">
                              {item.selectedAddons.map((a) => `+ ${a.name}`).join(" · ")}
                              {item.notes ? ` · "${item.notes}"` : ""}
                            </p>
                          )}

                          <span className="text-xs font-bold text-brand-red dark:text-brand-yellow pt-0.5">
                            {formatCurrency(item.itemTotal)}
                          </span>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 p-1 rounded-full bg-brand-cream dark:bg-brand-dark-surface border border-brand-cream-dark/40 dark:border-brand-dark-border">
                          <button
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-white dark:bg-brand-dark-card flex items-center justify-center text-brand-text-primary dark:text-white shadow-xs active:scale-90"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-display font-bold text-xs text-brand-text-primary dark:text-brand-dark-text w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center shadow-xs active:scale-90"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Upsell Suggestions */}
                {upsellProducts.length > 0 && (
                  <div className="flex flex-col gap-2 pt-2">
                    <span className="font-display font-bold text-sm text-brand-text-primary dark:text-brand-dark-text">
                      {t.combinaComPedido}
                    </span>
                    <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar -mx-5 px-5">
                      {upsellProducts.map((p) => (
                        <div
                          key={p.id}
                          className="flex-shrink-0 w-36 rounded-xl bg-white dark:bg-brand-dark-card border border-brand-cream-dark/50 dark:border-brand-dark-border p-2 flex flex-col justify-between"
                        >
                          <div className="relative w-full h-20 rounded-lg overflow-hidden mb-1.5">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                            <button
                              onClick={() => addItem(p, 1)}
                              className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center shadow-sm"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="font-display font-bold text-xs truncate">
                            {locale === "en" ? p.nameEn : p.name}
                          </span>
                          <span className="text-[11px] font-bold text-brand-red dark:text-brand-yellow">
                            {formatCurrency(p.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Financial Summary */}
                <div className="p-4 rounded-2xl bg-white dark:bg-brand-dark-card border border-brand-cream-dark/50 dark:border-brand-dark-border flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs text-brand-text-secondary dark:text-brand-dark-secondary">
                    <span>{t.subtotal}</span>
                    <span className="font-bold text-brand-text-primary dark:text-brand-dark-text">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  {deliveryType === "delivery" && (
                    <div className="flex items-center justify-between text-xs text-brand-text-secondary dark:text-brand-dark-secondary">
                      <span>{t.deliveryFee}</span>
                      <span className="font-bold text-brand-text-primary dark:text-brand-dark-text">
                        {deliveryFee === 0 ? (
                          <span className="text-emerald-600 font-bold uppercase">{t.free}</span>
                        ) : (
                          formatCurrency(deliveryFee)
                        )}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-brand-cream-dark/40 dark:border-brand-dark-border flex items-center justify-between">
                    <span className="font-display font-bold text-sm text-brand-text-primary dark:text-brand-dark-text">
                      {t.total}
                    </span>
                    <span className="font-display font-extrabold text-xl text-brand-red dark:text-brand-yellow">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Fixed Checkout CTA Button */}
          {items.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-brand-dark-surface/95 backdrop-blur-md border-t border-brand-cream-dark/60 dark:border-brand-dark-border">
              <button
                onClick={handleCheckoutClick}
                className="w-full py-4 px-6 rounded-full bg-brand-red hover:bg-brand-red-hover text-white font-bold text-base shadow-btn flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.checkoutButton}</span>
                <span>·</span>
                <span>{formatCurrency(total)}</span>
                <ArrowRight className="w-4 h-4 ml-1 stroke-[2.5]" />
              </button>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
