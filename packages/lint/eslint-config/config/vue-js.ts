import globals from 'globals';
import recommendedJavascript from '../rules/recommended-javascript';
import vue from '../rules/vue';
import vueParser from 'vue-eslint-parser';
import pluginVue from 'eslint-plugin-vue';

const config = [
  {
    files: ['**/*.js', '**/*.jsx'],
    extends: [recommendedJavascript],
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
    extends: [recommendedJavascript, vue],
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

export default config;
