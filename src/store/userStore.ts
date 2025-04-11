import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  selectedRecipeId: number | null;
  setSelectedRecipeId: (id: number) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      selectedRecipeId: null,
      setSelectedRecipeId: (id) => set({ selectedRecipeId: id }),
    }),
    {
      name: "user-store", // localStorage key
    }
  )
);
