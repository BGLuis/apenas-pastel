"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Clock, MessageCircle, Heart } from "lucide-react";
import { useLocaleStore } from "@/store/useLocaleStore";

export function DesktopFooter() {
  const { t } = useLocaleStore();

  return (
    <footer id="onde-estamos" className="w-full bg-brand-text-primary dark:bg-brand-dark-surface text-white pt-12 pb-24 md:pb-12 rounded-t-[40px] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center p-1.5 border border-white/10">
                <Image
                  src="/images/logo-simbolo.svg"
                  alt="Apenas Pastel"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="leading-none">
                <span className="font-serif italic font-semibold text-2xl text-white mr-1.5">
                  Apenas
                </span>
                <span className="font-display font-extrabold text-2xl text-brand-yellow">
                  Pastel
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              {t.footerAddress}
            </p>
          </div>

          {/* Col 2: Horários & Local */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="font-display font-bold text-base text-brand-yellow">
              Atendimento & Horários
            </h4>
            <div className="flex items-start gap-2.5 text-sm text-white/80">
              <Clock className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
              <span>Terça a Domingo das 17h às 23h (Segunda fechado)</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-white/80">
              <MapPin className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
              <span>Rua Exemplo, 120 · Bairro Barroca, Belo Horizonte - MG</span>
            </div>
          </div>

          {/* Col 3: Encomendas no WhatsApp */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-display font-bold text-base text-brand-yellow">
              Fale com a loja
            </h4>
            <a
              href="https://wa.me/5531999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1A8045] hover:bg-[#146938] text-white font-bold text-sm shadow-md transition-all w-fit"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>(31) 99999-9999</span>
            </a>
            <span className="text-xs text-white/50">
              Respostas em cerca de 2 minutos
            </span>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>{t.footerCopy}</p>
          <p className="flex items-center gap-1">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 fill-brand-red text-brand-red" />
            <span>para amantes de pastel de feira</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
