import globals from 'globals';
import eslintPlugin from '../plugin';
import vueParser from 'vue-eslint-parser';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [eslintPlugin.configs.ts],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['**/*.vue'],
    extends: [eslintPlugin.configs.ts, eslintPlugin.configs.vue],
    plugins: {
      get vue() {
        return pluginVue;
      },
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue', '.tsx'],
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    processor: 'vue/vue',
    rules: {
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/dot-notation': 'off',
    },
  },
];
