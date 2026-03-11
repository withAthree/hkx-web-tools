import globals from 'globals';
import recommendedTypescript from '../rules/recommended-typescript';
import vue from '../rules/vue';
import vueParser from 'vue-eslint-parser';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

const config: any = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [recommendedTypescript],
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
    extends: [recommendedTypescript, vue],
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

export default config;
