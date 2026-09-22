import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://ensaio.spozzer.com",

  build: {
    inlineStylesheets: "always",
  },
});