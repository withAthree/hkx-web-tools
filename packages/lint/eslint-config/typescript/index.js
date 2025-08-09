import typescript from '../rules/typescript.js'
import index from '../index.js'

export default [
  ...typescript,
  ...index,
  {
    name: 'eslint-config/typescript/index',
    files: ['*.{ts,tsx}', '**/*.{ts,tsx}'],
  }
]