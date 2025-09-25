import path from 'node:path';
// @ts-expect-error missing types
import fs from 'fs-extra';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const pkg: Record<string, any> = JSON.parse(fs.readFileSync(path.join(dirname, '../package.json'), 'utf-8'));

export enum UNICODE {
  // ✔
  success = '\u2714',

  // ✖
  failure = '\u2716',
}

export const UN_DEV = '(Under development)';

/**
 * 包名
 */
export const PKG_NAME: string = pkg.name;

/**
 * 包版本号
 */
export const PKG_VERSION: string = pkg.version;

export const PROJECT_TYPE = [
  {
    label: 'Javascript',
    value: 'index',
  },
  {
    label: 'Typescript',
    value: 'typescript',
  },
  {
    label: 'Vue',
    value: 'vue',
  },
  {
    label: 'Vue + Typescript',
    value: 'typescript/vue',
  },
  {
    label: 'Node',
    value: 'node',
  },
  {
    label: 'Node + Typescript',
    value: 'typescript/node',
  },
  {
    label: `React${UN_DEV}`,
    value: 'react',
    disabled: true,
  },
  {
    label: `React + Typescript${UN_DEV}`,
    value: 'typescript/react',
    disabled: true,
  },
] as const;

export const VERSION_MAP = {
  eslint: '^9.32.0',
  stylelint: '^16.23.0',
  'simple-git-hooks': '^2.13.1',
  'lint-staged': '^16.1.5',
  markdownlint: '^0.38.0',
  'postcss-html': '^1.8.0',
};

export const VSCODE_SETTING_CONTENT = `
  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never",
    "source.fixAll.stylelint": "explicit"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off", "fixable": true },
    { "rule": "format/*", "severity": "off", "fixable": true },
    { "rule": "*-indent", "severity": "off", "fixable": true },
    { "rule": "*-spacing", "severity": "off", "fixable": true },
    { "rule": "*-spaces", "severity": "off", "fixable": true },
    { "rule": "*-order", "severity": "off", "fixable": true },
    { "rule": "*-dangle", "severity": "off", "fixable": true },
    { "rule": "*-newline", "severity": "off", "fixable": true },
    { "rule": "*quotes", "severity": "off", "fixable": true },
    { "rule": "*semi", "severity": "off", "fixable": true }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "json5",
    "jsonc",
    "yaml",
    "toml",
    "xml",
    "gql",
    "graphql",
    "astro",
    "svelte",
    "css",
    "less",
    "scss",
    "pcss",
    "postcss"
  ],

  "stylelint.validate": [
    "css",
    "vue",
    "less",
    "scss",
    "postcss"
  ]
`;

export const MARKDOWNLINT_CONFIG = `{
  "extends": "hkx-markdownlint-config"
}
`;
