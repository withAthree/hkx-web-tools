# hkx-eslint-config

`hkx-eslint-config` 是面向 ESLint 9 Flat Config 的规则预设，把 JavaScript、TypeScript、React、Vue 和 Node.js 的编码规范封装成可直接继承的配置对象，也可以只取其中的规则集自行组装。

当前版本：`2.1.0`

## 1. 特性

- 只支持 ESLint 9 的 Flat Config（`eslint.config.*`），不提供 `.eslintrc` 旧格式。
- 内置解析器与依赖：`typescript-eslint`、`vue-eslint-parser`、`eslint-plugin-vue`、`@eslint-react/eslint-plugin`、`eslint-plugin-n`、`eslint-plugin-import-x`、`@stylistic/eslint-plugin`，无需在业务项目里重复安装。
- 8 个开箱即用的子路径，外加 `rules` 子路径导出的 5 组规则集。
- TypeScript 相关配置启用 `parserOptions.projectService`，可做类型感知（type-aware）检查。

## 2. 安装

```shell
pnpm add -D eslint hkx-eslint-config
```

| 依赖 | 版本要求 | 说明 |
| --- | --- | --- |
| `eslint` | `^9.32.0` | peerDependency，必须由业务项目提供 |
| `typescript` | 项目已有版本 | 仅 `standard-ts`、`node-ts`、`react-ts`、`vue-ts` 需要 |

::: tip
TypeScript 子路径使用 `projectService`，要求被 lint 的文件都在项目 `tsconfig.json` 的 `include` 范围内，否则会提示找不到文件对应的 project。
:::

## 3. 使用预设配置（推荐）

预设里已经包含 `files`、`extends`、`languageOptions`、`plugins` 等设置，直接展开即可：

```js
// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import vueTs from 'hkx-eslint-config/vue-ts';

export default defineConfig([
  ...vueTs,
  {
    ignores: ['**/node_modules/**', '**/dist/**'],
  },
]);
```

### 3.1. 子路径一览

| 子路径 | 匹配文件 | 内置规则集 | 语言环境 |
| --- | --- | --- | --- |
| `hkx-eslint-config/standard` | `**/*.js` | `recommended` | 默认 |
| `hkx-eslint-config/standard-ts` | `**/*.ts` | `recommendedTs` | 默认 |
| `hkx-eslint-config/node` | `**/*.js` | `recommended` + `node` | `globals.node` |
| `hkx-eslint-config/node-ts` | `**/*.ts` | `recommendedTs` + `node` | `globals.node` |
| `hkx-eslint-config/react` | `**/*.js`、`**/*.jsx` | `recommended` + `react` | `globals.browser`，开启 `ecmaFeatures.jsx` |
| `hkx-eslint-config/react-ts` | `**/*.ts`、`**/*.tsx` | `recommendedTs` + `react` | `globals.browser` |
| `hkx-eslint-config/vue` | `**/*.js`、`**/*.jsx`、`**/*.vue` | `recommended` + `vue` | `globals.browser`，开启 `ecmaFeatures.jsx` |
| `hkx-eslint-config/vue-ts` | `**/*.ts`、`**/*.tsx`、`**/*.vue` | `recommendedTs` + `vue` | `globals.browser` |

### 3.2. Vue 配置的组成

Vue 相关子路径导出的是两个配置块：

- 第一块处理脚本文件（`**/*.js` / `**/*.jsx`，或 `**/*.ts` / `**/*.tsx`），使用 `typescript-eslint` 的 parser。
- 第二块处理 `**/*.vue`，使用 `vue-eslint-parser`，通过 `processor: 'vue/vue'` 把 `<script>` 与模板拆出来分别检查；TypeScript 版本还会把 `vue-eslint-parser` 的 `parserOptions.parser` 指向 `typescript-eslint` 的 parser。

`vue-ts` 额外关闭了两条不适合模板场景的规则：

| 规则 | 原因 |
| --- | --- |
| `@typescript-eslint/restrict-plus-operands` | 模板中的字符串拼接被误判 |
| `@typescript-eslint/dot-notation` | 模板中的属性访问形式受限 |

## 4. 只使用规则集

如果需要自己控制 parser、`languageOptions` 或插件，可以从 `hkx-eslint-config/rules` 按需引入规则集：

```js
// eslint.config.mjs
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

| 导出名 | 内容 |
| --- | --- |
| `recommended` | JavaScript 基础规则集（`rules/base/*` 中的通用部分） |
| `recommendedTs` | TypeScript 规则集，依赖 `@typescript-eslint` 插件 |
| `node` | Node.js 规则集，基于 `eslint-plugin-n` |
| `react` | React 规则集，基于 `@eslint-react/eslint-plugin` |
| `vue` | Vue 规则集，基于 `eslint-plugin-vue` |

规则集之间可以任意组合，组合顺序决定覆盖顺序：后面的规则会覆盖前面的同名规则。

## 5. 追加与覆盖规则

`defineConfig` 接受数组，越靠后的对象优先级越高：

```js
// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import nodeTs from 'hkx-eslint-config/node-ts';

export default defineConfig([
  ...nodeTs,
  {
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },
]);
```

只关闭某条规则时，也可以在项目里做局部覆盖，而不是替换整个预设。

## 6. 与 Prettier 共存

格式化交给 Prettier 时，把 `eslint-config-prettier` 的 flat 版本追加到末尾，用于关闭与 Prettier 冲突的规则：

```shell
pnpm add -D prettier eslint-config-prettier
```

```js
// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import vueTs from 'hkx-eslint-config/vue-ts';

export default defineConfig([
  ...vueTs,
  eslintConfigPrettier,
]);
```

使用 `hkx-lint-tool` 初始化并选择 Prettier 时，生成的 `eslint.config.mjs` 会自动带上这一段。

## 7. 常见问题

### 提示 `ESLint couldn't determine the plugin ... uniquely`

业务项目里重复安装了预设已内置的插件（如 `eslint-plugin-vue`）。删掉重复依赖，或使用包管理器的 overrides / resolutions 对齐版本。

### TypeScript 文件报类型信息相关的错误

`projectService` 需要文件属于某个 `tsconfig.json`。检查 `tsconfig.json` 的 `include` 是否覆盖了被检查的文件，或者为测试目录补充一个 `tsconfig`。

### Vue 文件的模板报未知全局变量

`vue` / `vue-ts` 预设只内置了 `globals.browser`。使用其他运行时的全局变量时，在自己的配置块里补充 `languageOptions.globals`。
