import { Button, ButtonGroup } from "flowbite-react";
import { Check, LayoutGrid, Menu } from "lucide-react";
import { useAppStore } from "../store/AppStore";
import { useSelectionActions } from "../store/TableStore";

export default function DataViewMode() {
  const { isTableViewMode, setIsTableViewMode } = useAppStore();
  const { clearSelection } = useSelectionActions();

  return (
    <ButtonGroup className="rounded-full">
      {isTableViewMode ? (
        <>
          <Button
            className="bg-primary-200 dark:bg-primary-900 pointer-events-none !rounded-l-full border-black p-2.5 focus:ring-0 dark:border-white"
            color="alternative"
          >
            <Check size={20} className="dark:text-white" />
            <Menu size={20} className="dark:text-white" />
          </Button>
          <Button
            className="!rounded-r-full border-black p-2.5 focus:ring-0 dark:border-white"
            color="alternative"
            onClick={() => {
              setIsTableViewMode(false);
              clearSelection();
            }}
          >
            <LayoutGrid className="dark:text-white" size={20} />
          </Button>
        </>
      ) : (
        <>
          <Button
            className="!rounded-l-full border-black p-2.5 focus:ring-0 dark:border-white"
            color="alternative"
            onClick={() => setIsTableViewMode(true)}
          >
            <Menu className="dark:text-white" size={20} />
          </Button>
          <Button
            className="bg-primary-200 dark:bg-primary-900 pointer-events-none !rounded-r-full border-black p-2.5 focus:ring-0 dark:border-white"
            color="alternative"
          >
            <Check className="dark:text-white" size={20} />
            <LayoutGrid className="dark:text-white" size={20} />
          </Button>
        </>
      )}
    </ButtonGroup>
  );
}
