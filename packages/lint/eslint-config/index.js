import { defineConfig } from "eslint/config";
import es6Config from './rules/base/es6.js'
import bestPractices from './rules/base/best-practices.js'
import possibleErrors from './rules/base/possible-errors.js'

export default defineConfig([
  {
    files:['**/*.js'],
    extends:[es6Config, bestPractices,possibleErrors]
  }
]);
