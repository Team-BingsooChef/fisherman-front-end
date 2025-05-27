import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    sentryVitePlugin({
      org: "fisherman-z4",
      project: "javascript-react",
      sourcemaps: {
        // Sentry로 업로드 후 dist에서 .map을 지움
        filesToDeleteAfterUpload: ["./dist/**/*.map"],
      },
    }),
  ],

  optimizeDeps: {
    include: [
      "@chakra-ui/react",
      "@emotion/react",
      "@emotion/styled",
      "framer-motion",
    ],
  },

  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },

  build: {
    // 브라우저가 자동으로 못 찾게 주석을 제거하고,
    // .map 안에는 sourcesContent를 빼도록
    sourcemap: "hidden",
    rollupOptions: {
      output: { sourcemapExcludeSources: true },
    },
  },
});
