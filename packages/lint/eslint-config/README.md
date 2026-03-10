# hkx-eslint-config

HKX 代码规范，基于 ESLint 9 Flat Config。

## 安装

```bash
pnpm add -D eslint hkx-eslint-config
```

要求 **ESLint ^9.32.0**（peerDependency）。

## 用法

在项目根目录新建 `eslint.config.js`（或 `eslint.config.mjs` / `eslint.config.ts`），按项目类型选用对应 config 并展开：

```js
import { defineConfig } from 'eslint/config';
import hkx from 'hkx-eslint-config';

export default defineConfig([
  ...hkx.configs.ts,  // 按需换成 js / node / react / vue / vueTs / reactTs / nodeTs
  {
    ignores: ['**/node_modules/**', '**/dist/**'],
  },
]);
```

### 可选配置

| 名称     | 说明           |
|----------|----------------|
| `js`     | 纯 JavaScript  |
| `ts`     | TypeScript     |
| `node`   | Node.js (JS)   |
| `nodeTs` | Node.js (TS)   |
| `react`  | React (JS)     |
| `reactTs`| React (TS)     |
| `vue`    | Vue (JS)       |
| `vueTs`  | Vue (TS)       |

多种场景可组合多段 config（如先 `...hkx.configs.ts` 再 `...hkx.configs.vueTs`），或按 `files` 在各自 config 里区分。

## 以插件形式使用

可挂载自带的 plugin，通过 `extends` 使用内置规则（plugin 提供 `js` / `ts` / `node` / `react` / `vue`）：

```js
import { defineConfig } from 'eslint/config';
import hkx from 'hkx-eslint-config';

export default defineConfig([
  {
    plugins: {
      hkx: hkx.plugin,
    },
    extends: ['hkx/ts'],
  },
]);
```

推荐直接展开 `hkx.configs.xxx`，按需组合、可配合 `files` 与 `ignores`。
