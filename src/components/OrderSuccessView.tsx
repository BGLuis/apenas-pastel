"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Check, MessageCircle, ArrowLeft, Clock, ChefHat, Bike } from "lucide-react";
import { useLocaleStore } from "@/store/useLocaleStore";
import { PastelBorder } from "@/components/PastelBorder";

interface OrderSuccessViewProps {
  onBackToMenu: () => void;
}

export function OrderSuccessView({ onBackToMenu }: OrderSuccessViewProps) {
  const { t } = useLocaleStore();

  useEffect(() => {
    // Launch celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#E7B717", "#880208", "#FCE9A8", "#1A8045"],
    });
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-dark-bg text-brand-text-primary dark:text-brand-dark-text flex flex-col pb-16">
      {/* Red Festive Hero */}
      <div className="w-full bg-brand-red dark:bg-brand-dark-surface text-white pt-12 pb-8 px-6 flex flex-col items-center text-center">
        {/* Celebration Illustration */}
        <div className="relative w-36 h-36 mb-6 flex items-center justify-center">
          {/* Decorative floating dots/confetti */}
          <div className="absolute top-2 left-2 w-3 h-4 bg-brand-yellow rounded-xs rotate-12" />
          <div className="absolute top-1 right-3 w-4 h-5 bg-[#C65F33] rounded-xs -rotate-12" />
          <div className="absolute bottom-4 left-3 w-3 h-3 bg-white rounded-xs" />
          <div className="absolute bottom-5 right-2 w-2 h-4 bg-brand-yellow rounded-xs rotate-45" />

          {/* Central Logo Symbol */}
          <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center p-3 border border-white/20 shadow-lg">
            <Image
              src="/images/logo-simbolo.svg"
              alt="Mascote Apenas Pastel"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Green Success Badge */}
          <div className="absolute -bottom-1 right-2 w-10 h-10 rounded-full bg-emerald-500 border-4 border-brand-red dark:border-brand-dark-surface flex items-center justify-center text-white shadow-md">
            <Check className="w-5 h-5 stroke-[3]" />
          </div>
        </div>

        {/* Big Heading */}
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
          {t.successTitlePart1}{" "}
          <span className="font-serif italic text-brand-yellow">
            {t.successTitleHighlight}
          </span>
          {t.successTitlePart2}
        </h1>

        <p className="text-sm sm:text-base text-brand-yellow-light/90 dark:text-brand-dark-secondary max-w-sm sm:max-w-md text-balance leading-relaxed">
          {t.successSubtitle}
        </p>
      </div>

      {/* Pastel Border Separator */}
      <PastelBorder />

      {/* Main Content */}
      <div className="max-w-xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Stepper Card */}
        <div className="rounded-3xl bg-white dark:bg-brand-dark-surface p-5 sm:p-6 border border-brand-cream-dark/50 dark:border-brand-dark-border shadow-card flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-brand-cream-dark/40 dark:border-brand-dark-border">
            <h3 className="font-display font-bold text-base sm:text-lg">
              {t.stepsHeading}
            </h3>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary dark:text-brand-dark-secondary">
              Pedido #A7F2
            </span>
          </div>

          {/* Progress Timeline */}
          <div className="flex flex-col gap-6 relative">
            {/* Step 1: Enviado (Done) */}
            <div className="flex items-start gap-3.5 relative">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 z-10 shadow-xs">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="font-display font-bold text-sm text-brand-text-primary dark:text-brand-dark-text">
                  {t.stepSentTitle}
                </span>
                <span className="text-xs text-brand-text-secondary dark:text-brand-dark-secondary">
                  19:42 · {t.stepSentDesc}
                </span>
              </div>
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-emerald-500 -mb-6" />
            </div>

            {/* Step 2: Confirmando (Active) */}
            <div className="flex items-start gap-3.5 relative">
              <div className="w-8 h-8 rounded-full bg-brand-yellow text-brand-text-primary flex items-center justify-center flex-shrink-0 z-10 shadow-xs ring-4 ring-brand-yellow/30 animate-pulse">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="font-display font-bold text-sm text-brand-text-primary dark:text-brand-dark-text">
                  {t.stepConfirmTitle}
                </span>
                <span className="text-xs text-brand-text-secondary dark:text-brand-dark-secondary">
                  {t.stepConfirmDesc}
                </span>
              </div>
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-brand-cream-dark dark:bg-brand-dark-border -mb-6" />
            </div>

            {/* Step 3: Na fritadeira */}
            <div className="flex items-start gap-3.5 relative">
              <div className="w-8 h-8 rounded-full bg-brand-cream dark:bg-brand-dark-card border border-brand-cream-dark dark:border-brand-dark-border text-brand-text-secondary dark:text-brand-dark-secondary flex items-center justify-center flex-shrink-0 z-10">
                <ChefHat className="w-4 h-4" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="font-display font-medium text-sm text-brand-text-secondary dark:text-brand-dark-secondary">
                  {t.stepFryingTitle}
                </span>
                <span className="text-xs text-brand-text-secondary/70">
                  {t.stepFryingDesc}
                </span>
              </div>
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-brand-cream-dark dark:bg-brand-dark-border -mb-6" />
            </div>

            {/* Step 4: A caminho */}
            <div className="flex items-start gap-3.5 relative">
              <div className="w-8 h-8 rounded-full bg-brand-cream dark:bg-brand-dark-card border border-brand-cream-dark dark:border-brand-dark-border text-brand-text-secondary dark:text-brand-dark-secondary flex items-center justify-center flex-shrink-0 z-10">
                <Bike className="w-4 h-4" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="font-display font-medium text-sm text-brand-text-secondary dark:text-brand-dark-secondary">
                  {t.stepOnWayTitle}
                </span>
                <span className="text-xs text-brand-text-secondary/70">
                  {t.stepOnWayDesc}
                </span>
              </div>
            </div>
          </div>

          {/* Stepper Disclaimer */}
          <p className="text-xs text-brand-text-secondary dark:text-brand-dark-secondary pt-3 border-t border-brand-cream-dark/40 dark:border-brand-dark-border">
            {t.stepDisclaimer}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <a
            href="https://wa.me/5531999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-full bg-[#1A8045] hover:bg-[#146938] text-white font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>{t.openChatAgain}</span>
          </a>

          <button
            onClick={onBackToMenu}
            className="w-full py-3.5 px-6 rounded-full bg-white dark:bg-brand-dark-surface border border-brand-cream-dark dark:border-brand-dark-border text-brand-red dark:text-brand-yellow font-bold text-sm shadow-sm flex items-center justify-center gap-2 hover:bg-brand-cream/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToMenu}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
