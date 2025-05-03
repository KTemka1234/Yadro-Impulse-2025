// store/useUIStore.ts
import { create } from "zustand";

type AppState = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isTableViewMode: boolean;
  setIsTableViewMode: (value: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  isTableViewMode: true,
  setIsTableViewMode: (value) => set({ isTableViewMode: value }),
}));
