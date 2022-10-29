// vite.config.js

import react from '@vitejs/plugin-react';

import path from "path";

import { defineConfig } from "vite";

import { injectHtml } from "vite-plugin-html";

import packageJson from "../../package.json";

export default defineConfig({
  base: packageJson.base || './',

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../../src"),
      "actions": path.resolve(__dirname, "../../src/actions"),
      "common": path.resolve(__dirname, "../../src/common"),
      "components": path.resolve(__dirname, "../../src/components"),
      "reducers": path.resolve(__dirname, "../../src/reducers"),
      "resources": path.resolve(__dirname, "../../src/resources"),
      "sagas": path.resolve(__dirname, "../../src/sagas"),
      "stores": path.resolve(__dirname, "../../src/stores"),
      "services": path.resolve(__dirname, "../../src/services"),
      "workers": path.resolve(__dirname, "../../src/workers"),
      "types": path.resolve(__dirname, "../../src/types"),
      "utils": path.resolve(__dirname, "../../src/utils"),
    },
  },

  server: {
    host: (packageJson.devServer && packageJson.devServer.host) || '127.0.0.1',
    port: (packageJson.devServer && packageJson.devServer.port) || 3000,
  },

  plugins: [
    react(),
    injectHtml({
      data: {
        // to be compatible with Webpack HtmlWebpackPlugin
        htmlWebpackPlugin: {
          options: {
            title: packageJson.title || "React App",
            env: "Vite",
          },
        },
      },
    }),
  ],
});
