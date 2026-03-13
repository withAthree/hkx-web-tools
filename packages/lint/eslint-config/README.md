# hkx-eslint-config

HKX 代码规范，基于 ESLint 9 Flat Config。

## 安装

```bash
pnpm add -D eslint hkx-eslint-config
```

- **ESLint**：^9.32.0（peerDependency）
- **TypeScript 配置**（`standard-ts` / `node-ts` / `react-ts` / `vue-ts`）：需在项目中安装 `typescript`，且 type-aware 规则依赖 `tsconfig.json`

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

从 `hkx-eslint-config/rules` 按需引入规则集，自行配置 parser、languageOptions、plugins 等：

```js
import { defineConfig } from 'eslint/config';
import { recommendedTs, node } from 'hkx-eslint-config/rules';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.ts'],
    extends: [recommendedTs, node],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { projectService: true },
      globals: { ...globals.node },
    },
  },
]);
```

| 导出名 | 说明 |
|--------|------|
| `recommended` | JS 基础规则集 |
| `recommendedTs` | TS 基础规则集 |
| `node` | Node 规则集 |
| `react` | React 规则集 |
| `vue` | Vue 规则集 |

可任意组合规则，再自行设置 parser、globals、plugins 等。
