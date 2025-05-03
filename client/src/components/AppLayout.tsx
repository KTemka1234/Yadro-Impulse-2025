import {
  Button,
  DarkThemeToggle,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
  useThemeMode,
} from "flowbite-react";
import { Image, Moon, Upload } from "lucide-react";
import { ReactNode, useState } from "react";
import UploadImageModal from "./UploadImageModal";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-full min-h-screen bg-gray-50">
      <header>
        <Sidebar aria-label="Sidebar with logo branding">
          <SidebarLogo
            href="#"
            img={mode === "light" ? "/logo-light.svg" : "/logo-dark.svg"}
            imgAlt="Yadro logo"
          ></SidebarLogo>

          <div className="my-8 flex gap-2.5">
            <Button size="lg" onClick={() => setIsModalOpen(true)}>
              <Upload className="mr-2 h-5 w-5" />
              Загрузить
            </Button>
            <DarkThemeToggle
              color="alternative"
              className="focus:ring-primary-200 border border-black p-3 dark:border-white"
            >
              <Moon />
            </DarkThemeToggle>
          </div>

          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem
                href="#"
                icon={Image}
                active={true}
                className="pointer-events-none"
              >
                Изображения
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </header>

      <UploadImageModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <main className="w-full p-10 dark:bg-black">{children}</main>
    </div>
  );
}
