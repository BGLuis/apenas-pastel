"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Sun, Moon, ShoppingBag } from "lucide-react";
import { useLocaleStore } from "@/store/useLocaleStore";
import { useCartStore } from "@/store/useCartStore";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onOpenCart?: () => void;
}

export function Header({ onOpenCart }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useLocaleStore();
  const itemCount = useCartStore((state) => state.getItemCount());
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full bg-brand-red dark:bg-brand-dark-surface text-white transition-colors duration-300">
      {/* Top Status & Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2 flex items-center justify-between">
        {/* Language selector */}
        <div className="flex items-center bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-full p-1 border border-white/15">
          <button
            onClick={() => setLocale("pt")}
            className={cn(
              "px-3 py-1 text-xs font-bold rounded-full transition-all tracking-wider",
              locale === "pt"
                ? "bg-white text-brand-text-primary shadow-sm"
                : "text-white/80 hover:text-white"
            )}
            aria-label="Português"
          >
            PT
          </button>
          <button
            onClick={() => setLocale("en")}
            className={cn(
              "px-3 py-1 text-xs font-bold rounded-full transition-all tracking-wider",
              locale === "en"
                ? "bg-white text-brand-text-primary shadow-sm"
                : "text-white/80 hover:text-white"
            )}
            aria-label="English"
          >
            EN
          </button>
        </div>

        {/* Theme Toggle Button */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-2 p-2 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-full border border-white/15 text-white/90 hover:text-white transition-colors"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? (
              <Moon className="w-4 h-4 text-brand-yellow" />
            ) : (
              <Sun className="w-4 h-4 text-brand-yellow" />
            )}
          </button>
        )}
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105 border border-white/10 shadow-sm">
            <Image
              src="/images/logo-simbolo.svg"
              alt="Logo Apenas Pastel"
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="leading-none select-none">
            <span className="font-serif italic font-semibold text-2xl text-white mr-1.5">
              Apenas
            </span>
            <span className="font-display font-extrabold text-2xl tracking-tight text-brand-yellow dark:text-white">
              Pastel
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-white/90">
          <a href="#cardapio" className="hover:text-brand-yellow transition-colors">
            {locale === "pt" ? "Cardápio" : "Menu"}
          </a>
          <a href="#combos" className="hover:text-brand-yellow transition-colors">
            Combos
          </a>
          <a href="#como-funciona" className="hover:text-brand-yellow transition-colors">
            {locale === "pt" ? "Como funciona" : "How it works"}
          </a>
          <a href="#onde-estamos" className="hover:text-brand-yellow transition-colors">
            {locale === "pt" ? "Onde estamos" : "Location"}
          </a>
        </nav>

        {/* Store Status / Desktop Cart Trigger */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-xs font-semibold text-white/95">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.storeStatus}</span>
          </div>

          {/* Desktop Cart Button */}
          {onOpenCart && (
            <button
              onClick={onOpenCart}
              className="hidden md:flex items-center gap-2.5 px-4 py-2 bg-brand-cream text-brand-text-primary dark:bg-brand-dark-card dark:text-white rounded-full font-bold text-sm shadow-md hover:scale-105 transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-brand-red dark:text-brand-yellow" />
              <span>{locale === "pt" ? "Sacola" : "Bag"}</span>
              <span className="w-6 h-6 rounded-full bg-brand-red text-white text-xs flex items-center justify-center font-bold">
                {itemCount}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
