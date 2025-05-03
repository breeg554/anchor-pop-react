import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: "src",
      exclude: ["src/utils.ts"],
    }),
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "anchor-pop-react",
      fileName: (fmt) => (fmt === "es" ? "index.mjs" : "index.js"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: { react: "React" },
      },
    },

    sourcemap: false,
  },

  root: ".",
  server: { open: "/demo/" },
});
