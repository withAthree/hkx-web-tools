# hkx-eslint-config

HKX 代码规范，基于 ESLint 9 Flat Config。

## 安装

```bash
pnpm add -D eslint hkx-eslint-config
```

要求 **ESLint ^9.32.0**（peerDependency）。

## 两种用法

### 1. 使用 config（开箱即用）

直接使用预设配置，已包含解析器、extends、语言选项等：

```js
import { defineConfig } from 'eslint/config';
import nodeTs from 'hkx-eslint-config/node-ts';

export default defineConfig([
  ...nodeTs,
  { ignores: ['**/node_modules/**', '**/dist/**'] },
]);
```

| 子路径 | 说明 |
|--------|------|
| `hkx-eslint-config/standard` | 纯 JavaScript |
| `hkx-eslint-config/standard-ts` | TypeScript |
| `hkx-eslint-config/node` | Node.js (JS) |
| `hkx-eslint-config/node-ts` | Node.js (TS) |
| `hkx-eslint-config/react` | React (JS) |
| `hkx-eslint-config/react-ts` | React (TS) |
| `hkx-eslint-config/vue` | Vue (JS) |
| `hkx-eslint-config/vue-ts` | Vue (TS) |

### 2. 仅使用规则，自配解析器等

只引入规则集（`Linter.Config`），自行配置 parser、languageOptions、plugins 等：

```js
import { defineConfig } from 'eslint/config';
import recommendedTypescript from 'hkx-eslint-config/rules/recommended-typescript';
import node from 'hkx-eslint-config/rules/node';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.ts'],
    extends: [recommendedTypescript, node],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { projectService: true },
      globals: { ...globals.node },
    },
  },
]);
```

| 子路径 | 说明 |
|--------|------|
| `hkx-eslint-config/rules/recommended-javascript` | JS 基础规则集 |
| `hkx-eslint-config/rules/recommended-typescript` | TS 基础规则集 |
| `hkx-eslint-config/rules/node` | Node 规则集 |
| `hkx-eslint-config/rules/react` | React 规则集 |
| `hkx-eslint-config/rules/vue` | Vue 规则集 |

可任意组合 rules，再自行设置 parser、globals、plugins 等。
