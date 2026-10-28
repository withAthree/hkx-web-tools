# hkx-lint-tool

`hkx-lint-tool` 是交互式初始化脚手架：读取当前目录的 `package.json`，生成 ESLint / stylelint / Prettier / VSCode 配置，并把 lint 相关依赖与脚本写进 `package.json`。

当前版本：`2.0.7`

## 1. 前置条件

| 条件 | 说明 |
| --- | --- |
| 项目根目录存在 `package.json` | 工具会读取并回写该文件 |
| 使用 pnpm | 生成依赖版本时会执行 `pnpm view <pkg> version` 查询最新版本，没有 pnpm 会直接失败 |
| 能访问 npm registry | 版本号来自 registry 查询 |
| 不存在 `eslint.config.*` | 存在 `eslint.config.js`、`eslint.config.ts`、`eslint.config.mjs`、`eslint.config.mts` 任一个时会退出，需要先手动删除 |

## 2. 快速开始

```shell
# 交互式选择
pnpm dlx hkx-lint-tool@latest

# 跳过交互，使用默认值
pnpm dlx hkx-lint-tool@latest -y
```

执行完成后按提示安装依赖、挂载 git 钩子：

```shell
pnpm install
npx simple-git-hooks
```

## 3. 交互项

| 交互项 | 默认值 | 说明 |
| --- | --- | --- |
| 项目类型 | `Javascript`（`standard`） | 8 选 1，决定 `eslint.config.*` 继承哪个子路径、`lint-staged` 匹配哪些扩展名 |
| `Do you need stylelint?` | `false` | 生成 `.stylelintrc.mjs`，追加 stylelint 依赖与脚本 |
| `Do you need prettier?` | `false` | 生成 `.prettierrc`、`.prettierignore`，并让 ESLint 配置追加 `eslint-config-prettier` |
| `Do you need commitlint?` | `true` | 配置 `simple-git-hooks` 与 `lint-staged`（不安装 commitlint 本身） |
| `Do you need to update vscode settings?` | `true` | 创建或合并 `.vscode/settings.json` |

项目类型可选值：

| 显示名 | 值 | 对应配置 |
| --- | --- | --- |
| `Javascript` | `standard` | `hkx-eslint-config/standard` |
| Typescript | `standard-ts` | `hkx-eslint-config/standard-ts` |
| Vue | `vue` | `hkx-eslint-config/vue` |
| Vue + Typescript | `vue-ts` | `hkx-eslint-config/vue-ts` |
| Node | `node` | `hkx-eslint-config/node` |
| Node + Typescript | `node-ts` | `hkx-eslint-config/node-ts` |
| React | `react` | `hkx-eslint-config/react` |
| React + Typescript | `react-ts` | `hkx-eslint-config/react-ts` |

::: tip markdownlint 暂未接入
脚手架内部保留了 markdownlint 的开关字段（默认关闭），但当前版本没有对应的交互项，也不会生成 `.markdownlint.json`。需要时请手动接入 `hkx-markdownlint-config`。
:::

## 4. 生成的文件

### 4.1. eslint.config.js / eslint.config.mjs

扩展名由 `package.json` 的 `type` 字段决定：`type: "module"` 生成 `.mjs`，否则生成 `.js`。以 Vue + TypeScript 为例：

```js
import { defineConfig } from 'eslint/config';
import eslintConfig from 'hkx-eslint-config/vue-ts';

export default defineConfig([
  ...eslintConfig
])
```

选择 Prettier 时会追加：

```js
import { defineConfig } from 'eslint/config';
import eslintConfig from 'hkx-eslint-config/vue-ts';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  ...eslintConfig,
  eslintConfigPrettier
])
```

如果目录里存在 `.eslintignore`，其中的规则会被转换成 flat config 的 `ignores` 并并入配置：

```js
export default defineConfig([
  ...eslintConfig,
  { ignores: ["dist/**","coverage/**"] }
])
```

::: warning 该文件会被直接覆盖
工具不会合并已存在的 `eslint.config.js` / `.mjs`，写入前请确认内容。其他历史的 `.eslintrc*`、`.prettierrc*` 等文件不会自动删除，CLI 结束时会列出候选文件提示手动删除。
:::

### 4.2. .stylelintrc.mjs

选择 stylelint 后生成：

```js
export default {
  "extends": [
    "hkx-stylelint-config"
  ]
};
```

Vue 项目会额外补充 `overrides`，让 `.vue` 文件使用 `postcss-html`：

```js
export default {
  "extends": [
    "hkx-stylelint-config"
  ],
  "overrides": [
    {
      "files": [
        "**/*.vue"
      ],
      "customSyntax": "postcss-html"
    }
  ]
};
```

### 4.3. .prettierrc 与 .prettierignore

选择 Prettier 后生成：

```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "printWidth": 120,
  "endOfLine": "lf",
  "trailingComma": "es5",
  "jsxSingleQuote": false,
  "bracketSpacing": true
}
```

`.prettierignore` 默认内容：

```text
node_modules
dist
build
coverage
.git
*.min.js
*.snap
*.lock
*.log
.DS_Store
eslint.config.*
```

### 4.4. VSCode 设置文件

创建或合并（新值覆盖同名旧值）以下设置：

- `prettier.enable: false`、`editor.formatOnSave: false`
- `editor.codeActionsOnSave`：保存时执行 `source.fixAll.eslint` 与 `source.fixAll.stylelint`
- `eslint.rules.customizations`：把 `style/*`、`format/*`、`*-indent` 等格式化类规则在编辑器里置为 off
- `eslint.validate` / `stylelint.validate`：声明需要在编辑器里检查的语言

如果同时选择了 Prettier，会改为 `prettier.enable: true`、`editor.formatOnSave: true`，并把默认格式化器设为 `esbenp.prettier-vscode`。

## 5. `package.json` 的改动

### 5.1. devDependencies

只添加缺失的依赖，已存在的不覆盖：

| 依赖 | 版本 | 触发条件 |
| --- | --- | --- |
| `hkx-eslint-config` | 查询 registry 得到的最新版本（`^` 前缀） | 始终 |
| `eslint` | `^9.32.0` | 始终 |
| `hkx-stylelint-config` | 最新版本 | 选择 stylelint |
| `stylelint` | `^16.23.0` | 选择 stylelint |
| `postcss-html` | `^1.8.0` | 选择 stylelint 且是 Vue 项目 |
| `prettier` | `^3.8.1` | 选择 Prettier |
| `eslint-config-prettier` | `^10.0.1` | 选择 Prettier |
| `stylelint-config-prettier` | `^9.0.5` | 选择 Prettier 且选择 stylelint |
| `simple-git-hooks` | `^2.13.1` | 选择 commitlint |
| `lint-staged` | `^16.1.5` | 选择 commitlint |

### 5.2. scripts

同样只补缺失项：

| 脚本 | 命令 | 触发条件 |
| --- | --- | --- |
| `lint` | `eslint .` | 始终 |
| `lint:fix` | `eslint --fix` | 始终 |
| `lint:check` | `eslint . --max-warnings 0` | 始终 |
| `lint:style` | `stylelint "**/*.css"` 或 `stylelint "**/*.{css,vue}"`（Vue 项目） | 选择 stylelint |
| `lint:style:fix` | 同上加 `--fix` | 选择 stylelint |
| `stylelint-check` | `stylelint-config-prettier-check` | 同时选择 stylelint 与 Prettier |
| `prettier` | `prettier --write .` | 选择 Prettier |
| `prettier:check` | `prettier --check .` | 选择 Prettier |
| `format` | `prettier --write . && eslint . --fix` | 选择 Prettier |

### 5.3. simple-git-hooks 与 lint-staged

选择 commitlint 时写入（若字段已存在则保留原值）：

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  }
}
```

`lint-staged` 的文件匹配规则按项目类型生成：

| 项目类型 | 匹配规则 | 命令 |
| --- | --- | --- |
| `Javascript` / Node | `*.js` | `eslint --fix` |
| Typescript / Node + Typescript | `*.{js,ts}` | `eslint --fix` |
| React | `*.{js,jsx}` | `eslint --fix` |
| React + Typescript | `*.{js,ts,jsx,tsx}` | `eslint --fix` |
| Vue | `*.{js,jsx,vue}` | `eslint --fix` |
| Vue + Typescript | `*.{js,ts,jsx,tsx,vue}` | `eslint --fix` |

选择 Prettier 时，命令变为 `["eslint --fix", "prettier --write"]`。

## 6. 结束提示

成功后会输出：

```text
Now you can run pnpm install to update dependencies! And run npx simple-git-hooks to initialize git hooks!
```

其中 `npx simple-git-hooks` 只在选择了 commitlint 时出现。

## 7. 已知限制

- **必须使用 pnpm**：版本号解析依赖 `pnpm view`，`npm` / `yarn` 环境下会失败。
- **不支持已存在 ESLint 配置**：检测到 `eslint.config.*` 会直接退出，需要先删除旧文件。
- **ESLint 配置会被覆盖**：`eslint.config.js` / `.mjs` 是无条件写入，不做内容合并。
- **markdownlint 未接入**：见上文提示，需要手动配置。
- **commitlint 只做钩子编排**：不会安装 `commitlint` 相关依赖，只写入 `simple-git-hooks` 与 `lint-staged` 配置。
