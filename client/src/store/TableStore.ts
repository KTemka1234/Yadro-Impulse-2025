import { create } from "zustand";
import { PetData } from "../components/TableView";

type SelectionStore = {
  selectedRows: PetData[];
  actions: {
    setSelectedRows: (rows: PetData[]) => void;
    clearSelection: () => void;
    getSelectedCount: () => number;
  };
};

export const useSelectionStore = create<SelectionStore>((set, get) => ({
  selectedRows: [],
  actions: {
    setSelectedRows: (rows) => set({ selectedRows: rows }),
    clearSelection: () => set({ selectedRows: [] }),
    getSelectedCount: () => get().selectedRows.length,
  },
}));

// Оптимизированные хуки для доступа
export const useSelectedRows = () =>
  useSelectionStore((state) => state.selectedRows);
export const useSelectionActions = () =>
  useSelectionStore((state) => state.actions);
