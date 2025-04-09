// src/store/userStore.ts
import { create } from "zustand";

interface UserStore {
  selectedRecipeId: number | null;
  setSelectedRecipeId: (id: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  selectedRecipeId: null,
  setSelectedRecipeId: (id) => set({ selectedRecipeId: id }),
}));
