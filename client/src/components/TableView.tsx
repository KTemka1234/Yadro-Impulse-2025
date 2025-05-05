import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useAppStore } from "../store/AppStore";
import { useSelectedRows, useSelectionActions } from "../store/TableStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type PetData = {
  id: string;
  description: string;
  uploadDate: string;
  size: string;
  asciiArt: string;
};

const columnHelper = createColumnHelper<PetData>();
const columns = [
  columnHelper.display({
    id: "select",
    // header: ({ table }) => (
    //   <Checkbox
    //     checked={table.getIsAllRowsSelected()}
    //     onChange={table.getToggleAllRowsSelectedHandler()}
    //   />
    // ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),

  columnHelper.accessor("description", {
    header: "Описание",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("uploadDate", {
    header: "Дата загрузки",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("size", {
    header: "Размер",
    cell: (info) => info.getValue(),
  }),
];

export default function TableView({ data }: { data: PetData[] }) {
  const { searchQuery } = useAppStore();
  const selectedRows = useSelectedRows();
  const { setSelectedRows: setSelectedRows } = useSelectionActions();
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setGlobalFilter(searchQuery);
  }, [searchQuery]);

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection: selectedRows.reduce(
        (acc, row) => {
          acc[row.id] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      ),
      globalFilter,
      pagination,
    },
    onRowSelectionChange: (updater) => {
      const newSelection =
        typeof updater === "function"
          ? updater(table.getState().rowSelection)
          : updater;

      const selected = data.filter((row) => newSelection[row.id]);
      setSelectedRows(selected);
    },
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    enableRowSelection: true,
    enableMultiRowSelection: false,
  });

  const options = [10, 25, 50, 100];

  return (
    <div>
      <Table hoverable>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => (
                <TableHeadCell
                  key={header.id}
                  className={idx === 0 ? "w-16" : ""}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHeadCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} onClick={() => row.toggleSelected()}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Table footer - page size dropdown and pagination */}
      <div className="flex justify-between p-4">
        {/* Page size dropdown */}
        <div className="flex items-center gap-2.5 text-sm">
          <div className="text-gray-600 dark:text-gray-200">
            Изображения{" "}
            <span className="font-semibold text-black dark:text-white">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {(table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize >
              data.length
                ? data.length
                : (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize}
            </span>{" "}
            из{" "}
            <span className="font-semibold text-black dark:text-white">
              {data.length}
            </span>
            .
          </div>
          <div className="text-gray-600 dark:text-gray-200">Показывать:</div>
          <Dropdown
            label={table.getState().pagination.pageSize}
            color="alternative"
            placement="top"
            theme={{ arrowIcon: "ml-1" }}
            className="h-fit w-fit items-center p-2 dark:text-white"
          >
            {options.map((option) => (
              <DropdownItem
                key={option}
                onClick={() => table.setPageSize(Number(option))}
              >
                {option}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
        {/* Pagination */}
        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="text-gray-600 dark:text-gray-200">
            Страница{" "}
            <span className="font-semibold text-black dark:text-white">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            из{" "}
            <span className="font-semibold text-black dark:text-white">
              {table.getPageCount()}
            </span>
          </div>

          <Button
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
