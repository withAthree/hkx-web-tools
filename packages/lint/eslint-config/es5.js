import { defineConfig } from "eslint/config";
import bestPractices from './rules/base/best-practices.js'
import possibleErrors from './rules/base/possible-errors.js'
import style from './rules/base/style.js'
import variables from './rules/base/variables.js'
import es5 from './rules/es5.js'

export default defineConfig([
  {
    name: 'es5 index config',
    files: ['**/*.js'],
    extends: [bestPractices, possibleErrors, style, variables, es5]
  }
]);
