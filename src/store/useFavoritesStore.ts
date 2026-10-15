import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: ["queijo", "calabresa"],
      isFavorite: (id) => get().favorites.includes(id),
      toggleFavorite: (id) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          set({ favorites: favorites.filter((favId) => favId !== id) });
        } else {
          set({ favorites: [...favorites, id] });
        }
      },
    }),
    {
      name: "apenas-pastel-favorites",
    }
  )
);
