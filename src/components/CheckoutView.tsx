"use client";

import React, { useState } from "react";
import { ArrowLeft, Check, Info, MessageCircle, CreditCard, DollarSign, QrCode } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useLocaleStore } from "@/store/useLocaleStore";
import { PaymentMethod } from "@/types";
import { formatCurrency, cn } from "@/lib/utils";

interface CheckoutViewProps {
  onBack: () => void;
  onOrderCompleted: () => void;
}

export function CheckoutView({ onBack, onOrderCompleted }: CheckoutViewProps) {
  const { items, deliveryType, getSubtotal, getDeliveryFee, getTotal } = useCartStore();
  const { locale, t } = useLocaleStore();

  const [customerName, setCustomerName] = useState("Luis Henrique");
  const [street, setStreet] = useState("Rua Pium-í, 1250");
  const [neighborhood, setNeighborhood] = useState("Barroca");
  const [complement, setComplement] = useState("Apto 302");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const total = getTotal();
  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();

  const handleSendOrder = () => {
    // Generate WhatsApp text
    const paymentLabels = {
      pix: "Pix",
      card: "Cartão na entrega (Maquininha)",
      cash: "Dinheiro",
    };

    const itemsSummary = items
      .map((item) => {
        const addonsText = item.selectedAddons.length > 0 ? ` (+ ${item.selectedAddons.map((a) => a.name).join(", ")})` : "";
        const noteText = item.notes ? ` [Obs: ${item.notes}]` : "";
        return `• ${item.quantity}x ${item.product.name}${addonsText}${noteText} - ${formatCurrency(item.itemTotal)}`;
      })
      .join("\n");

    const message = `🥟 *NOVO PEDIDO - APENAS PASTEL* 🥟\n\n` +
      `*Cliente:* ${customerName}\n` +
      `*Tipo:* ${deliveryType === "delivery" ? "Entrega em domicílio" : "Retirada no balcão"}\n` +
      (deliveryType === "delivery" ? `*Endereço:* ${street}, ${neighborhood}${complement ? ` - ${complement}` : ""}\n` : "") +
      `*Pagamento:* ${paymentLabels[paymentMethod]}\n\n` +
      `*ITENS DO PEDIDO:*\n${itemsSummary}\n\n` +
      `*Subtotal:* ${formatCurrency(subtotal)}\n` +
      (deliveryType === "delivery" ? `*Taxa de entrega:* ${deliveryFee === 0 ? "Grátis" : formatCurrency(deliveryFee)}\n` : "") +
      `*TOTAL:* ${formatCurrency(total)}\n\n` +
      `_Enviado pelo cardápio digital Apenas Pastel_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5531999999999?text=${encodedMessage}`;

    // Open WhatsApp in new tab/app
    window.open(whatsappUrl, "_blank");

    // Transition to success screen
    onOrderCompleted();
  };

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-dark-bg text-brand-text-primary dark:text-brand-dark-text flex flex-col pb-28">
      {/* App Bar */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-brand-dark-surface/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-brand-cream-dark/50 dark:border-brand-dark-border flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-brand-text-primary dark:text-white hover:text-brand-red transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.checkoutTitle}</span>
        </button>

        <div className="px-3.5 py-1 rounded-full bg-brand-cream dark:bg-brand-dark-card border border-brand-cream-dark/60 dark:border-brand-dark-border font-display font-bold text-sm text-brand-text-primary dark:text-brand-dark-text">
          {formatCurrency(total)}
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Step 1: Quem vai receber */}
        <div className="rounded-3xl bg-white dark:bg-brand-dark-surface p-5 sm:p-6 border border-brand-cream-dark/50 dark:border-brand-dark-border shadow-card flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-brand-yellow text-brand-text-primary font-display font-bold text-sm flex items-center justify-center">
              1
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl">
              {t.step1Title}
            </h3>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary dark:text-brand-dark-secondary">
              {t.step1NameLabel}
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder={t.step1NamePlaceholder}
              className="w-full h-12 px-4 rounded-xl bg-brand-cream/40 dark:bg-brand-dark-card border border-brand-cream-dark/60 dark:border-brand-dark-border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow transition-all"
            />
          </div>
        </div>

        {/* Step 2: Onde entregar */}
        {deliveryType === "delivery" && (
          <div className="rounded-3xl bg-white dark:bg-brand-dark-surface p-5 sm:p-6 border border-brand-cream-dark/50 dark:border-brand-dark-border shadow-card flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-brand-yellow text-brand-text-primary font-display font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl">
                {t.step2Title}
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {/* Street */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary dark:text-brand-dark-secondary">
                  {t.step2StreetLabel}
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder={t.step2StreetPlaceholder}
                  className="w-full h-12 px-4 rounded-xl bg-brand-cream/40 dark:bg-brand-dark-card border border-brand-cream-dark/60 dark:border-brand-dark-border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow transition-all"
                />
              </div>

              {/* Neighborhood with validation badge */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary dark:text-brand-dark-secondary">
                  {t.step2NeighborhoodLabel}
                </label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-brand-cream/40 dark:bg-brand-dark-card border border-brand-cream-dark/60 dark:border-brand-dark-border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow transition-all"
                />
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{t.step2NeighborhoodSuccess}</span>
                </div>
              </div>

              {/* Complement */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary dark:text-brand-dark-secondary">
                  {t.step2ComplementLabel}
                </label>
                <input
                  type="text"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                  placeholder={t.step2ComplementPlaceholder}
                  className="w-full h-12 px-4 rounded-xl bg-brand-cream/40 dark:bg-brand-dark-card border border-brand-cream-dark/60 dark:border-brand-dark-border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Como vai pagar? */}
        <div className="rounded-3xl bg-white dark:bg-brand-dark-surface p-5 sm:p-6 border border-brand-cream-dark/50 dark:border-brand-dark-border shadow-card flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-brand-yellow text-brand-text-primary font-display font-bold text-sm flex items-center justify-center">
              3
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl">
              {t.step3Title}
            </h3>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Card on delivery (Figma default) */}
            <label
              onClick={() => setPaymentMethod("card")}
              className={cn(
                "cursor-pointer p-4 rounded-2xl border-2 flex items-center justify-between transition-all",
                paymentMethod === "card"
                  ? "bg-brand-yellow-light/40 dark:bg-brand-yellow/10 border-brand-red dark:border-brand-yellow"
                  : "bg-white dark:bg-brand-dark-card border-brand-cream-dark/50 dark:border-brand-dark-border"
              )}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 dark:bg-brand-yellow/10 flex items-center justify-center text-brand-red dark:text-brand-yellow">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-text-primary dark:text-brand-dark-text">
                    {t.paymentCard}
                  </h4>
                  <p className="text-xs text-brand-text-secondary dark:text-brand-dark-secondary">
                    {t.paymentCardDesc}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  paymentMethod === "card"
                    ? "border-brand-red dark:border-brand-yellow"
                    : "border-brand-cream-dark"
                )}
              >
                {paymentMethod === "card" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-red dark:bg-brand-yellow" />
                )}
              </div>
            </label>

            {/* Pix */}
            <label
              onClick={() => setPaymentMethod("pix")}
              className={cn(
                "cursor-pointer p-4 rounded-2xl border-2 flex items-center justify-between transition-all",
                paymentMethod === "pix"
                  ? "bg-brand-yellow-light/40 dark:bg-brand-yellow/10 border-brand-red dark:border-brand-yellow"
                  : "bg-white dark:bg-brand-dark-card border-brand-cream-dark/50 dark:border-brand-dark-border"
              )}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 dark:bg-brand-yellow/10 flex items-center justify-center text-brand-red dark:text-brand-yellow">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-text-primary dark:text-brand-dark-text">
                    {t.paymentPix}
                  </h4>
                  <p className="text-xs text-brand-text-secondary dark:text-brand-dark-secondary">
                    {t.paymentPixDesc}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  paymentMethod === "pix"
                    ? "border-brand-red dark:border-brand-yellow"
                    : "border-brand-cream-dark"
                )}
              >
                {paymentMethod === "pix" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-red dark:bg-brand-yellow" />
                )}
              </div>
            </label>

            {/* Cash */}
            <label
              onClick={() => setPaymentMethod("cash")}
              className={cn(
                "cursor-pointer p-4 rounded-2xl border-2 flex items-center justify-between transition-all",
                paymentMethod === "cash"
                  ? "bg-brand-yellow-light/40 dark:bg-brand-yellow/10 border-brand-red dark:border-brand-yellow"
                  : "bg-white dark:bg-brand-dark-card border-brand-cream-dark/50 dark:border-brand-dark-border"
              )}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 dark:bg-brand-yellow/10 flex items-center justify-center text-brand-red dark:text-brand-yellow">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-text-primary dark:text-brand-dark-text">
                    {t.paymentCash}
                  </h4>
                  <p className="text-xs text-brand-text-secondary dark:text-brand-dark-secondary">
                    {t.paymentCashDesc}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  paymentMethod === "cash"
                    ? "border-brand-red dark:border-brand-yellow"
                    : "border-brand-cream-dark"
                )}
              >
                {paymentMethod === "cash" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-red dark:bg-brand-yellow" />
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Trust Note */}
        <div className="p-4 rounded-2xl bg-brand-cream-dark/40 dark:bg-brand-dark-card border border-brand-cream-dark/60 dark:border-brand-dark-border flex items-start gap-3">
          <Info className="w-5 h-5 text-brand-red dark:text-brand-yellow flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-brand-text-secondary dark:text-brand-dark-secondary leading-relaxed">
            {t.trustNote}
          </p>
        </div>
      </div>

      {/* Fixed WhatsApp CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-white/95 dark:bg-brand-dark-surface/95 backdrop-blur-md border-t border-brand-cream-dark/60 dark:border-brand-dark-border">
        <div className="max-w-xl mx-auto">
          <button
            onClick={handleSendOrder}
            className="w-full py-4 px-6 rounded-full bg-[#1A8045] hover:bg-[#146938] text-white font-bold text-base shadow-lg flex items-center justify-center gap-2.5 transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>{t.sendWhatsAppButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
