import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/simple-weather/",
  define: {
    // Injects the version as a string constant
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(pkg.version),
    "import.meta.env.VITE_APP_NAME": JSON.stringify(pkg.name),
  },
  resolve: {
    alias: {
      $fonts: resolve("./fonts"),
    },
  },
});
