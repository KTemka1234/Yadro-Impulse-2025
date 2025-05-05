import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, UserConfig } from "vite";
import flowbiteReact from "flowbite-react/plugin/vite";

const parseEnvPort = (port?: string): number => {
  const parsed = Number(port);
  return isNaN(parsed) ? 5173 : parsed;
};

// https://vite.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, "../", ["VITE_"]);

  return {
    envDir: "../",
    plugins: [react(), tailwindcss(), flowbiteReact()],
    server: {
      port: parseEnvPort(env.VITE_PORT),
      host: true, // Для Docker-контейнеризации
      watch: {
        usePolling: true, // Для работы в Docker на некоторых системах
      },
    },
  };
});
