import { ReactNode, useState } from "react";
import { useAppStore } from "../store/AppStore";
import { useSelectionStore } from "../store/TableStore";
import DataViewMode from "./DataViewMode";
import { Button, TextInput } from "flowbite-react";
import { Search } from "lucide-react";
import AsciiViewer from "./AsciiViewer";

export default function DataLayout({ children }: { children: ReactNode }) {
  const { searchQuery, setSearchQuery } = useAppStore();
  const selectedIds = useSelectionStore();
  const [isViewerOpened, setIsViewerOpened] = useState(false);
  const hasSelection = selectedIds.selectedRows.length > 0;

  return (
    <div className="flex w-full flex-col gap-5 rounded-lg bg-white p-5 dark:bg-gray-900">
      <div className="flex justify-between">
        <h1 className="text-3xl dark:text-white">Изображения</h1>
        <DataViewMode />
      </div>

      <div className="flex flex-wrap justify-between gap-2.5 p-4">
        <div>
          <Button
            onClick={() => setIsViewerOpened(true)}
            hidden={!hasSelection}
          >
            Открыть
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
      {isViewerOpened && (
        <AsciiViewer
          asciiArt={"ascii art"}
          onClose={() => setIsViewerOpened(false)}
        />
      )}
      {children}
    </div>
  );
}
