import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "prettier/prettier": "error",
      "react/jsx-filename-extension": [
        "warn",
        { extensions: [".ts", ".tsx", ".jsx", ".js"] },
      ],
      "import/prefer-default-export": "off",
      "jsx-quotes": ["error", "prefer-single"],
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.recommended,
  eslintConfigPrettier, // Desativa regras conflitantes do ESLint com Prettier
  {
    plugins: {
      prettier,
    },
  },
];
