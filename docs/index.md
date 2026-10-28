---
home: true
title: 前端工程化工具集
heroText: 前端工程化工具集
tagline: 用一套 lint 配置与一个交互式脚手架，统一团队的项目规范落地面
actions:
  - text: 快速接入 →
    link: /cli/lint-tool.md
    type: primary
  - text: 查看 npm 包
    link: /npm/eslint-config.md
    type: secondary
---

## 工具一览

`hkx-web-tools` 是一套前端工程化工具集，把「编码规范 → Lint 规则 → 可执行配置」这条链路收敛成三个可独立使用的 npm 包。

| 规范 / 能力 | 落地工具 | npm 包 | 文档 |
| --- | --- | --- | --- |
| JavaScript / TypeScript / React / Vue / Node 编码规范 | [ESLint](https://eslint.org/) | [hkx-eslint-config](https://www.npmjs.com/package/hkx-eslint-config) | [使用说明](/npm/eslint-config.md) |
| CSS / Vue 样式编码规范 | [stylelint](https://stylelint.io/) | [hkx-stylelint-config](https://www.npmjs.com/package/hkx-stylelint-config) | [使用说明](/npm/stylelint-config.md) |
| 一键接入上述工具 | [hkx-lint-tool](/cli/lint-tool.md) | [hkx-lint-tool](https://www.npmjs.com/package/hkx-lint-tool) | [CLI 手册](/cli/lint-tool.md) |

## 快速开始

在项目根目录（必须存在 `package.json`）执行：

```shell
pnpm dlx hkx-lint-tool@latest
```

按提示选择项目类型、是否需要 stylelint / prettier，脚手架会生成配置并更新 `package.json`。跳过交互、直接使用默认值：

```shell
pnpm dlx hkx-lint-tool@latest -y
```

之后安装依赖并挂载 git 钩子：

```shell
pnpm install
npx simple-git-hooks
```

## 手动接入

不想用脚手架时，直接继承对应的配置即可（以 Vue + TypeScript 项目为例）：

```js
// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import eslintConfig from 'hkx-eslint-config/vue-ts';

export default defineConfig([...eslintConfig]);
```

```js
// .stylelintrc.mjs
export default {
  extends: ['hkx-stylelint-config'],
};
```

## 文档导航

- [编码规范](/coding/html.md)：HTML、CSS、JavaScript、Node、TypeScript 五份规约正文
- [工程规范](/engineering/git.md)：Git 提交、文档写作、CHANGELOG 维护
- [npm 包](/npm/eslint-config.md)：各配置包支持的项目类型与用法
- [脚手架](/cli/lint-tool.md)：`hkx-lint-tool` 的交互项、生成物与限制
