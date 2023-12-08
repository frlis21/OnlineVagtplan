import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  test: {
    environment: "jsdom",
    globals: true,
    testTransformMode: { web: ["/.[jt]sx?$/"] },
    coverage: {
      reporter: ["text", "json", "html"],
    },
    // Attempts to get testing to work -_-
    //resolve: {
    //  alias: {
    //    "solid-js": "node_modules/solid-js/dist/dev.js",
    //    "@solidjs/router": "node_modules/@solidjs/router/index.jsx",
    //  },
    //},
    deps: {
      //inline: [/solid-js/, /@solidjs\/router/],
      //registerNodeLoader: false,
    },
  },
});
