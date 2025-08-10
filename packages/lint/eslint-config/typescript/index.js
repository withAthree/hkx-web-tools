import typescript from '../rules/typescript.js'
import index from '../index.js'

import tseslint from 'typescript-eslint';

const [typeScriptRules,typescriptOverride] = typescript

export default [
  {
    ...typeScriptRules,
    files: ['*.{ts,tsx}', '**/*.{ts,tsx}'],
  },
  typescriptOverride,
  ...index,
  {
    name: 'eslint-config/typescript/index',
    files: ['*.{ts,tsx}', '**/*.{ts,tsx}'],
    settings: {
      'import/parsers': {
        [tseslint.parser]: ['.ts', '.d.ts', '.tsx'],
      },
      // Use eslint-import-resolver-typescript
      'import/resolver': {
        typescript: {},
      },
      // Append 'ts' extensions to 'import/extensions' setting
      'import/extensions': ['.js', '.ts', '.mjs'],
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          globalReturn: false,
          jsx: true,
        },
        projectService: true,
      },
    },
  }
]