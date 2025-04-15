import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Recipe } from "@/types";
import { toast } from "sonner"; // ✅ Add this

interface FavoriteStore {
  favorites: Recipe[];
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (recipe) => {
        const alreadyFavorite = get().favorites.find((r) => r.id === recipe.id);
        if (!alreadyFavorite) {
          set((state) => ({
            favorites: [...state.favorites, recipe],
          }));
          toast.success(`Added "${recipe.title}" to favorites`);
        }
      },
      removeFavorite: (id) => {
        const removed = get().favorites.find((r) => r.id === id);
        set((state) => ({
          favorites: state.favorites.filter((r) => r.id !== id),
        }));
        if (removed) {
          toast.success(`Removed "${removed.title}" from favorites`);
        }
      },
      isFavorite: (id) => !!get().favorites.find((r) => r.id === id),
    }),
    {
      name: "favorite-recipes",
    }
  )
);
