import { ReactNode } from "react";
import DataViewMode from "./DataViewMode";
import { Button, TextInput } from "flowbite-react";
import { Search } from "lucide-react";
import { useAppStore } from "../store/AppStore";
import { useSelectionStore } from "../store/TableStore";

export default function DataLayout({ children }: { children: ReactNode }) {
  const { searchQuery, setSearchQuery } = useAppStore();
  const selectedIds = useSelectionStore();

  const hasSelection = selectedIds.selectedIds.length > 0;

  return (
    <div className="flex w-full flex-col gap-5 rounded-lg bg-white p-5 dark:bg-gray-900">
      <div className="flex justify-between">
        <h1 className="text-3xl dark:text-white">Изображения</h1>
        <DataViewMode />
      </div>

      <div className="flex flex-wrap justify-between gap-2.5 p-4">
        <div>
          <Button color="red" hidden={!hasSelection}>
            Удалить
          </Button>
        </div>
        <TextInput
          id="search"
          type="text"
          icon={Search}
          placeholder="Поиск"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-sm"
        />
      </div>
      {children}
    </div>
  );
}
