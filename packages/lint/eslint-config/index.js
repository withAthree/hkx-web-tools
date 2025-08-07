import { defineConfig } from 'eslint/config';
import bestPractices from './rules/base/best-practices.js'
import possibleErrors from './rules/base/possible-errors.js'
import style from './rules/base/style.js'
import variables from './rules/base/variables.js'
import es6 from './rules/base/es6.js'
import strict from './rules/base/strict.js'
import importConfig from './rules/import.js'
import babelParser from '@babel/eslint-parser';

export default defineConfig([
  {
    name: 'index config',
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    extends: [bestPractices, possibleErrors, style, variables, es6, strict, importConfig],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          globalReturn: false,
          impliedStrict: true,
          jsx: true,
        },
      },
    }
  }
]);
