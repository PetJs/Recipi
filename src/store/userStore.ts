import { User } from "@/types";
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface UserStore {
  selectedRecipeId: number | null;
  setSelectedRecipeId: (id: number) => void;
  user: User | null;
  setUser: (data: { user: User }) => void;
  accessHash: string | null;
  refreshHash: string | null;
  setHash: (accessHash: string, refreshHash: string) => void;
}

type MyPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStore>
) => StateCreator<UserStore>;

export const useUserStore = create<UserStore>()(
  (persist as MyPersist)(
    (set) => ({
      user: null,
      accessHash: null,
      refreshHash: null,
      setHash: (accessHash, refreshHash) =>
        set({ accessHash, refreshHash }),
      setUser: ({ user }) =>
        set({
          user,
        }),
      selectedRecipeId: null,
      setSelectedRecipeId: (id) => set({ selectedRecipeId: id }),
    }),
    {
      name: "user-store", // localStorage key
    }
  )
);
