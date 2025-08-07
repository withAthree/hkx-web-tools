import { defineConfig } from "eslint/config";
import config from './rules/base/es6.js'
import bestPractices from './rules/base/best-practices.js'

export default defineConfig([
  {
    files:['**/*.js'],
    extends:[config, bestPractices]
  }
]);
