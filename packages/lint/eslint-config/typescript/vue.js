import vueParser from 'vue-eslint-parser';
import tseslint from 'typescript-eslint';

import vue from 'eslint-plugin-vue'



import index from './index.js'
import vueRules from '../rules/vue.js'

export default [
  ...vueRules,
  ...index,
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaFeatures: {
          jsx: true,
        },
        projectService: true,
        extraFileExtensions: ['.vue'],
      }
    }
  }
]