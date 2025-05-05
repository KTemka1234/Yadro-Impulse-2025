import { createTheme, ThemeProvider } from "flowbite-react";
import "./App.css";
import AppLayout from "./components/AppLayout";
import DataLayout from "./components/DataLayout";
import TableView, { PetData } from "./components/TableView";
import { useAppStore } from "./store/AppStore";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL } from "./config";
import { useSelectionActions } from "./store/TableStore";
import CardView from "./components/CardView";

const customTheme = createTheme({
  sidebar: {
    root: {
      inner: "h-full rounded-none dark:bg-black",
    },
    logo: {
      img: "w-full sm:h-auto",
    },
    item: {
      active: "bg-primary-200 dark:bg-primary-900",
    },
  },

  button: {
    base: "cursor-pointer",
  },
});

type AsciiArt = {
  ascii: string;
  description: string;
};

function App() {
  const { isTableViewMode } = useAppStore();
  const { clearSelection } = useSelectionActions();

  const { data: image, isLoading } = useQuery<AsciiArt>({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await fetch(BACKEND_URL + "/v1/pet");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      clearSelection();
      return data;
    },
  });

  const tableSkeleton = (
    <div
      role="status"
      className="w-full animate-pulse space-y-4 divide-y divide-gray-200 rounded-sm border border-gray-200 p-4 shadow-sm md:p-6 dark:divide-gray-700 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );

  const cardsSkeleton = (
    <div
      role="status"
      className="max-w-md animate-pulse rounded-sm border border-gray-200 p-4 shadow-sm md:p-6 dark:border-gray-700"
    >
      <div className="mb-4 flex h-48 items-center justify-center rounded-sm bg-gray-300 dark:bg-gray-700">
        <svg
          className="h-10 w-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        </svg>
      </div>
      <div className="h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (isLoading) {
    return (
      <ThemeProvider theme={customTheme}>
        <AppLayout>
          <DataLayout>
            {isTableViewMode ? tableSkeleton : cardsSkeleton}
          </DataLayout>
        </AppLayout>
      </ThemeProvider>
    );
  }

  if (!image) {
    return (
      <ThemeProvider theme={customTheme}>
        <AppLayout>
          <DataLayout>
            <div className="flex w-full flex-col items-center gap-2.5">
              <h2 className="text-center text-2xl font-light dark:text-white">
                Здесь пока нет изображений
              </h2>
              <img
                src="/no-data-img.svg"
                alt="Empty data image"
                className="max-w-sm"
              />
            </div>
          </DataLayout>
        </AppLayout>
      </ThemeProvider>
    );
  }

  const asciiSizeKb = image.ascii.length / 8192;
  const tableData: PetData[] = [
    {
      id: "1",
      description: image.description,
      uploadDate: new Date().toLocaleDateString(),
      size: asciiSizeKb.toFixed(2) + " Кб",
      asciiArt: image.ascii,
    },
  ];

  return (
    <ThemeProvider theme={customTheme}>
      <AppLayout>
        <DataLayout>
          {isTableViewMode ? <TableView data={tableData} /> : <CardView />}
        </DataLayout>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
