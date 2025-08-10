import vueRules from './rules/vue.js'
import index from './index.js'
import parserVue from "vue-eslint-parser";

const [vueConfig] = vueRules
export default [
  ...index,
  {
    name: 'eslint-config/vue',
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      sourceType: 'module',
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    ...vueConfig
  }
]
