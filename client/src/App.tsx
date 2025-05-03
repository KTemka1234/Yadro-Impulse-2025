import { createTheme, ThemeProvider } from "flowbite-react";
import "./App.css";
import AppLayout from "./components/AppLayout";
import DataLayout from "./components/DataLayout";
import TableView from "./components/TableView";
import { useAppStore } from "./store/AppStore";

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

const mockData = [
  {
    description: "Мой пушистый кот",
    uploadDate: new Date("2023-10-20").toLocaleDateString(),
    size: "1.2 MB",
  },
  {
    description: "Щенок золотистого ретривера",
    uploadDate: new Date("2023-10-21").toLocaleDateString(),
    size: "2.4 MB",
  },
  {
    description: "Щенок золотистого ретривера",
    uploadDate: new Date("2023-10-21").toLocaleDateString(),
    size: "2.4 MB",
  },
  {
    description: "Щенок золотистого ретривера",
    uploadDate: new Date("2023-10-21").toLocaleDateString(),
    size: "2.4 MB",
  },
  {
    description: "Щенок золотистого ретривера",
    uploadDate: new Date("2023-10-21").toLocaleDateString(),
    size: "2.4 MB",
  },
  {
    description: "Щенок золотистого ретривера",
    uploadDate: new Date("2023-10-21").toLocaleDateString(),
    size: "2.4 MB",
  },
  {
    description: "Щенок золотистого ретривера",
    uploadDate: new Date("2023-10-21").toLocaleDateString(),
    size: "2.4 MB",
  },
  {
    description: "Щенок золотистого ретривера",
    uploadDate: new Date("2023-10-21").toLocaleDateString(),
    size: "2.4 MB",
  },
  {
    description: "Щенок золотистого ретривера",
    uploadDate: new Date("2023-10-21").toLocaleDateString(),
    size: "2.4 MB",
  },
  {
    description: "Щенок золотистого ретривера",
    uploadDate: new Date("2023-10-21").toLocaleDateString(),
    size: "2.4 MB",
  },
  {
    description: "Щенок золотистого ретривера",
    uploadDate: new Date("2023-10-21").toLocaleDateString(),
    size: "2.4 MB",
  },
  {
    description: "Щенок золотистого ретривера",
    uploadDate: new Date("2023-10-21").toLocaleDateString(),
    size: "2.4 MB",
  },
];

function App() {
  const { isTableViewMode } = useAppStore();

  return (
    <ThemeProvider theme={customTheme}>
      <AppLayout>
        <DataLayout>
          {isTableViewMode && <TableView data={mockData} />}
        </DataLayout>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
