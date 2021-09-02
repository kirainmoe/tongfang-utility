// vite.config.js

import path from "path";

import packageJson from "../../package.json";

import { defineConfig } from "vite";
import reactRefresh from '@vitejs/plugin-react-refresh';
import { injectHtml } from "vite-plugin-html";

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
      "types": path.resolve(__dirname, "../../src/types"),
      "utils": path.resolve(__dirname, "../../src/utils"),
    },
  },

  esbuild: {
    jsxInject: "import React from 'react';"
  },

  plugins: [
    reactRefresh(),
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
