import { defineConfig } from "eslint/config";
import config from './rules/base/es6.js'

export default defineConfig([
  {
    files:['**/*.js'],
    extends:[config]
  }
]);
