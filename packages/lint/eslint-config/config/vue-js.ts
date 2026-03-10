import globals from 'globals';
import eslintPlugin from '../plugin';
import vueParser from 'vue-eslint-parser';
import pluginVue from 'eslint-plugin-vue';


export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    extends: [eslintPlugin.configs.js],
    languageOptions: {
      parserOptions: {
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
    extends: [eslintPlugin.configs.js, eslintPlugin.configs.vue],
    plugins: {
      get vue() {
        return pluginVue;
      },
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        extraFileExtensions: ['.vue', '.jsx'],
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    processor: 'vue/vue',
  },
];
