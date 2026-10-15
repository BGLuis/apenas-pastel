import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Locale, translations } from "@/data/i18n";

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (typeof translations)["pt"];
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: "pt",
      setLocale: (locale) => set({ locale, t: translations[locale] }),
      toggleLocale: () => {
        const next = get().locale === "pt" ? "en" : "pt";
        set({ locale: next, t: translations[next] });
      },
      t: translations["pt"],
    }),
    {
      name: "apenas-pastel-locale",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.t = translations[state.locale || "pt"];
        }
      },
    }
  )
);
