import tseslint from "typescript-eslint";

import jsIndex from "../index.js";
import tsRules from "../rules/typescript.js";
import vueRules from "../rules/vue.js";

export default [
  {
    extends: [jsIndex, tsRules, vueRules],
    files: ["**/*.{ts,tsx,js,jsx,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        parser: {
          ts: tseslint.parser,
          tsx: tseslint.parser,
          js: "espree",
          jsx: "espree",
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
