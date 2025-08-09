import vueRules from './rules/vue.js'
import index from './index.js'

export default [
  ...index,
  ...vueRules,
  {
    name: 'eslint-config/vue',
    files: ['*.vue', '**/*.vue'],
  }
]
