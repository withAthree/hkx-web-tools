import bestPractices from './rules/base/best-practices.js';
import possibleErrors from './rules/base/possible-errors.js';
import style from './rules/base/style.js';
import variables from './rules/base/variables.js';
import es6 from './rules/base/es6.js';
import strict from './rules/base/strict.js';
import importConfig from './rules/import.js';

export default [
  ...bestPractices,
  ...possibleErrors,
  ...style,
  ...variables,
  ...es6,
  ...strict,
  ...importConfig,
  {
    name: 'eslint-config/index',
    files: ['*.{js,jsx}', '**/*.{js.jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          globalReturn: false,
          impliedStrict: true,
          jsx: true,
        },
      },
    },
  },
];
