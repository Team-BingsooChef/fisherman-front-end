import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    basicSsl(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://api.smelt-fishing.com",
        changeOrigin: true,
        secure: false, // ✅ HTTPS 관련 인증서 문제 해결
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
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
});
