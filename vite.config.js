import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  base: "/Portafolio/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    open: true,
    port: 3000,
  },
});
