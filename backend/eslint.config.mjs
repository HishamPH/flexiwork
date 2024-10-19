// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";

// export default [
//   {files: ["**/*.{js,mjs,cjs,ts}"]},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
// ];

// eslint.config.mjs
import { defineConfig } from "eslint-define-config";

export default defineConfig({
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // Optional: for Prettier integration
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // Customize your rules here
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "no-unused-vars": "off", // Disable base rule
    "@typescript-eslint/no-unused-vars": ["error"], // Enable TypeScript-specific rule
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": "error", // Make Prettier issues errors
  },
  ignores: ["**/node_modules/**", "**/dist/**"],
});
