import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { docsPages } from "./docs-config";

const input = (file: string) => fileURLToPath(new URL(file, import.meta.url));
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        gallery: input("./index.html"),
        ...Object.fromEntries(
          docsPages.map(({ slug }) => [
            `docs-${slug || "home"}`,
            input(`./docs/${slug ? slug + "/" : ""}index.html`),
          ]),
        ),
      },
    },
  },
});
