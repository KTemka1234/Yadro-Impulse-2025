import { create } from "zustand";

type SelectionStore = {
  selectedIds: string[];
  actions: {
    setSelectedIds: (ids: string[]) => void;
    clearSelection: () => void;
    getSelectedCount: () => number;
  };
};

export const useSelectionStore = create<SelectionStore>((set, get) => ({
  selectedIds: [],
  actions: {
    setSelectedIds: (ids) => set({ selectedIds: ids }),
    clearSelection: () => set({ selectedIds: [] }),
    getSelectedCount: () => get().selectedIds.length,
  },
}));

// Оптимизированные хуки для доступа
export const useSelectedIds = () =>
  useSelectionStore((state) => state.selectedIds);
export const useSelectionActions = () =>
  useSelectionStore((state) => state.actions);
