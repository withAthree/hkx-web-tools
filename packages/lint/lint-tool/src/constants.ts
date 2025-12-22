import path from 'node:path';
// @ts-expect-error missing types
import fs from 'fs-extra';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

interface PackageJson {
  name: string;
  version: string;
  [key: string]: unknown;
}

/**
 * 读取并解析 package.json 文件
 * 在模块加载时执行，如果失败会抛出错误
 */
function loadPackageJson(): PackageJson {
  const packageJsonPath = path.join(dirname, '../package.json');
  try {
    const content = fs.readFileSync(packageJsonPath, 'utf-8');
    return JSON.parse(content) as PackageJson;
  } catch (error) {
    throw new Error(`Failed to load package.json from ${packageJsonPath}: ${String(error)}`);
  }
}

const pkg = loadPackageJson();

/**
 * Unicode 字符常量
 */
export enum UNICODE {
  // ✔
  success = '\u2714',

  // ✖
  failure = '\u2716',
}

/**
 * 开发中标识文本
 */
export const UN_DEV = '(Under development)';

/**
 * 包名
 */
export const PKG_NAME: string = pkg.name;

/**
 * 包版本号
 */
export const PKG_VERSION: string = pkg.version;

/**
 * 项目类型选项
 */
export interface ProjectTypeOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/**
 * 支持的项目类型列表
 */
export const PROJECT_TYPE: readonly ProjectTypeOption[] = [
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

/**
 * 依赖包版本映射表
 */
export const VERSION_MAP: Readonly<Record<string, string>> = {
  eslint: '^9.32.0',
  stylelint: '^16.23.0',
  'simple-git-hooks': '^2.13.1',
  'lint-staged': '^16.1.5',
  markdownlint: '^0.38.0',
  'postcss-html': '^1.8.0',
} as const;

/**
 * VSCode 设置内容（JSON 格式的部分内容，不包含外层大括号）
 * 用于合并到现有的 settings.json 文件中
 */
export const VSCODE_SETTING_CONTENT = `
  "prettier.enable": false,
  "editor.formatOnSave": false,

  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never",
    "source.fixAll.stylelint": "explicit"
  },

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

/**
 * Markdownlint 配置文件内容
 */
export const MARKDOWNLINT_CONFIG = `{
  "extends": "hkx-markdownlint-config"
}
`;
