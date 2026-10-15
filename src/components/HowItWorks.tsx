"use client";

import React from "react";
import { Utensils, MessageSquareText, Sparkles } from "lucide-react";
import { useLocaleStore } from "@/store/useLocaleStore";

export function HowItWorks() {
  const { t } = useLocaleStore();

  const steps = [
    {
      icon: Utensils,
      title: t.howStep1Title,
      desc: t.howStep1Desc,
    },
    {
      icon: MessageSquareText,
      title: t.howStep2Title,
      desc: t.howStep2Desc,
    },
    {
      icon: Sparkles,
      title: t.howStep3Title,
      desc: t.howStep3Desc,
    },
  ];

  return (
    <section id="como-funciona" className="w-full py-12 sm:py-16 bg-white dark:bg-brand-dark-surface border-y border-brand-cream-dark/50 dark:border-brand-dark-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-red dark:text-brand-yellow">
            Simples, direto e artesanal
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-text-primary dark:text-brand-dark-text mt-1">
            {t.howItWorksTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-3xl bg-brand-cream/40 dark:bg-brand-dark-card border border-brand-cream-dark/50 dark:border-brand-dark-border flex flex-col gap-4 shadow-sm hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-yellow/20 dark:bg-brand-yellow/10 flex items-center justify-center text-brand-red dark:text-brand-yellow">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-brand-text-primary dark:text-brand-dark-text">
                  {step.title}
                </h3>
                <p className="text-sm text-brand-text-secondary dark:text-brand-dark-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
