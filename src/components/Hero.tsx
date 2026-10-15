"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Clock, Bike, MessageCircle, ArrowDown, ChevronRight } from "lucide-react";
import { useLocaleStore } from "@/store/useLocaleStore";

interface HeroProps {
  onSelectFeaturedProduct?: () => void;
}

export function Hero({ onSelectFeaturedProduct }: HeroProps) {
  const { t } = useLocaleStore();

  return (
    <section className="relative w-full bg-brand-red dark:bg-brand-dark-surface text-white pt-6 pb-12 sm:pb-16 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle, Actions, Facts */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Location Tag */}
            <div className="inline-flex items-center gap-2 text-brand-yellow text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.locationTag}</span>
            </div>

            {/* Display Title */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-[0.98] tracking-tight text-balance text-white">
              {t.heroTitlePart1}{" "}
              <span className="font-serif italic font-semibold text-brand-yellow dark:text-brand-yellow">
                {t.heroTitleHighlight}
              </span>{" "}
              {t.heroTitlePart2}
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 dark:text-brand-dark-secondary text-base sm:text-lg leading-relaxed max-w-xl text-balance">
              {t.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#cardapio"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-text-primary rounded-full font-bold text-sm sm:text-base shadow-btn transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.seeMenu}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/5531999999999?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20no%20Apenas%20Pastel!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1A8045] hover:bg-[#146938] text-white rounded-full font-bold text-sm sm:text-base shadow-md transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t.orderWhatsApp}</span>
              </a>
            </div>

            {/* Highlights Bar: Delivery & Speed */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-xs sm:text-sm font-semibold text-white/90 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-yellow" />
                <span>{t.badgeDeliveryTime}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-2">
                <Bike className="w-4 h-4 text-brand-yellow" />
                <span>{t.badgeDeliveryFee}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-brand-yellow" />
                <span>{t.badgeWhatsApp}</span>
              </div>
            </div>

            {/* Facts Grid (Desktop) */}
            <div className="hidden sm:grid grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <div>
                <div className="font-display font-extrabold text-2xl lg:text-3xl text-brand-yellow">
                  {t.factPrepTime}
                </div>
                <div className="text-xs text-white/70">{t.factPrepTimeDesc}</div>
              </div>
              <div>
                <div className="font-display font-extrabold text-2xl lg:text-3xl text-white">
                  {t.factFlavors}
                </div>
                <div className="text-xs text-white/70">{t.factFlavorsDesc}</div>
              </div>
              <div>
                <div className="font-display font-extrabold text-2xl lg:text-3xl text-brand-yellow">
                  {t.factDaily}
                </div>
                <div className="text-xs text-white/70">{t.factDailyDesc}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Pastel Card + Rotating Frito na Hora Stamp */}
          <div className="lg:col-span-5 relative flex justify-center mt-4 lg:mt-0">
            <div
              onClick={onSelectFeaturedProduct}
              className="group relative cursor-pointer w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl bg-brand-cream-dark dark:bg-brand-dark-card border-4 border-white/10 transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Product Photo */}
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/pastel-queijo.png"
                  alt="Pastel de Queijo"
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Caption on Photo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-brand-yellow mb-1">
                      {t.classicOfTheHouse}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-white">
                      Pastel de Queijo
                    </h3>
                  </div>

                  {/* Price Tag */}
                  <div className="px-3 py-1.5 rounded-lg bg-brand-yellow text-brand-text-primary font-display font-bold text-lg shadow-price flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    <span>R$ 7,50</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Frito na Hora Rotating Stamp */}
            <div className="absolute -top-6 -right-4 sm:-right-8 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none select-none drop-shadow-xl z-20">
              <div className="relative w-full h-full animate-spin-slow">
                <Image
                  src="/images/selo-frito-na-hora.svg"
                  alt="Selo Frito na Hora Desde 2021"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
