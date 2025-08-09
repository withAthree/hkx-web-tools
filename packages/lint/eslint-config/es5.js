import { defineConfig } from "eslint/config";
import bestPractices from './rules/base/best-practices.js'
import possibleErrors from './rules/base/possible-errors.js'
import style from './rules/base/style.js'
import variables from './rules/base/variables.js'
import es5 from './rules/es5.js'

export default defineConfig([
  ...bestPractices,
  ...possibleErrors,
  ...style,
  ...variables,
  ...es5,
  {
    name: 'eslint-config/es5',
    files: ['*.js', '**/*.js'],
  }
]);
