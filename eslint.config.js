import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // React Hooks Rules
      ...reactHooks.configs.recommended.rules,

      // React Refresh Rules
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // TypeScript Rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: false },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // General ESLint Rules
      "no-unused-vars": "off", // Delegated to @typescript-eslint/no-unused-vars
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      semi: ["error", "always"],

      // Code Style and Best Practices
      "prefer-const": "warn",
      "no-var": "error",
      "arrow-spacing": ["error", { before: true, after: true }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
    },
  }
);
