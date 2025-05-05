import { Button } from "flowbite-react";
import { X } from "lucide-react";
import { useSelectedRows } from "../store/TableStore";

interface AsciiViewerProps {
  asciiArt: string;
  onClose: () => void;
}

export default function AsciiViewer({ onClose }: AsciiViewerProps) {
  const selectedRows = useSelectedRows();
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-gray-900/90">
      <div className="flex w-full flex-col items-center justify-center p-4">
        <Button
          color="alternative"
          className="mb-6 rounded-full"
          size="sm"
          onClick={onClose}
        >
          <X />
        </Button>
        <div className="w-auto overflow-auto rounded-3xl bg-white p-3 dark:bg-gray-800">
          <pre className="font-mono text-[4px] dark:text-white">
            {selectedRows[0].asciiArt}
          </pre>
        </div>
      </div>
    </div>
  );
}
