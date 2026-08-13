import { defineConfig } from "vite";

// Relative base so the built site works when served from any subpath
// (e.g. https://<user>.github.io/<repo>/) as well as from the root of
// a custom domain or any other static host — no absolute local paths.
export default defineConfig({
  base: "./",
  build: {
    target: "es2020",
    sourcemap: false,
  },
});
