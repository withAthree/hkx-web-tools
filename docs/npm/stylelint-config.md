# hkx-stylelint-config

`hkx-stylelint-config` 是面向 stylelint 16 的 CSS 规范配置，供业务项目通过 `extends` 直接继承。

当前版本：`2.0.2`

## 1. 特性

- 以 `warning` 级别报告问题（`defaultSeverity: 'warning'`），不会直接让构建失败。
- 覆盖 CSS 语法正确性、简写属性覆盖、重复声明、单位、颜色写法等 26 条规则。
- 默认忽略脚本文件：`**/*.js`、`**/*.jsx`、`**/*.ts`、`**/*.tsx`。
- 支持 Vue 单文件组件（需要配合 `postcss-html` 自定义语法）。

## 2. 安装

```shell
pnpm add -D stylelint hkx-stylelint-config
```

| 依赖 | 版本要求 | 说明 |
| --- | --- | --- |
| `stylelint` | `^16.23.0` | peerDependency，必须由业务项目提供 |
| `postcss-html` | `^1.8.0` | 仅检查 `.vue` 文件时需要 |

Vue 项目额外安装：

```shell
pnpm add -D postcss-html
```

## 3. 配置

新建 `.stylelintrc.mjs`（ESM 项目）或 `.stylelintrc.js`（CommonJS 项目）：

```js
// .stylelintrc.mjs
export default {
  extends: ['hkx-stylelint-config'],
};
```

Vue 项目需要为 `.vue` 文件补充自定义语法：

```js
// .stylelintrc.mjs
export default {
  extends: ['hkx-stylelint-config'],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
};
```

也可以写在 `package.json` 的 `stylelint` 字段中：

```json
{
  "stylelint": {
    "extends": ["hkx-stylelint-config"]
  }
}
```

配合 npm scripts 使用：

```json
{
  "scripts": {
    "lint:style": "stylelint \"**/*.{css,vue}\"",
    "lint:style:fix": "stylelint \"**/*.{css,vue}\" --fix"
  }
}
```

## 4. 规则清单

| 规则 | 配置 | 说明 |
| --- | --- | --- |
| `at-rule-no-unknown` | `null` | 不校验未知的 @ 规则，避免与预处理器语法冲突 |
| `block-no-empty` | `true` | 禁止空块 |
| `color-no-invalid-hex` | `true` | 禁止无效的十六进制颜色 |
| `comment-no-empty` | `true` | 禁止空注释 |
| `declaration-block-no-duplicate-properties` | `true`（忽略值不同的连续重复属性） | 禁止声明块内重复属性 |
| `declaration-block-no-shorthand-property-overrides` | `true` | 禁止简写属性覆盖已声明的长手属性 |
| `font-family-no-duplicate-names` | `true` | `font-family` 中不允许重复字体名 |
| `function-calc-no-unspaced-operator` | `true` | `calc()`、`min()` 等数学函数中运算符两侧必须有空格 |
| `function-linear-gradient-no-nonstandard-direction` | `true` | 禁止线性渐变使用非标准方向值 |
| `keyframe-declaration-no-important` | `true` | 关键帧声明中禁止 `!important` |
| `media-feature-name-no-unknown` | `true` | 禁止未知的媒体特性名 |
| `no-descending-specificity` | `null` | 不校验选择器特异性顺序 |
| `no-duplicate-at-import-rules` | `true` | 禁止重复的 `@import` |
| `no-duplicate-selectors` | `true` | 禁止重复选择器 |
| `no-empty-source` | `null` | 允许空样式文件 |
| `no-invalid-double-slash-comments` | `true` | 禁止使用 `//` 注释 |
| `property-no-unknown` | `true` | 禁止未知属性 |
| `selector-pseudo-class-no-unknown` | `true`（忽略 `global`、`local`、`export`） | 禁止未知伪类 |
| `selector-pseudo-element-no-unknown` | `true` | 禁止未知伪元素 |
| `string-no-newline` | `true` | 字符串中禁止换行 |
| `unit-no-unknown` | `true`（忽略 `px`） | 禁止未知单位 |
| `color-hex-length` | `'long'` | 十六进制颜色必须写满 6 位 |
| `comment-whitespace-inside` | `'always'` | 注释标记内部必须有空格 |
| `declaration-block-single-line-max-declarations` | `1` | 单行声明块最多一条声明 |
| `length-zero-no-unit` | `true`（忽略自定义属性） | 长度为 0 时省略单位 |
| `selector-max-id` | `0` | 禁止使用 ID 选择器 |

## 5. 调整严重级别

配置的 `defaultSeverity` 是 `warning`，即所有规则默认只报警告，不会影响进程退出码。需要在 CI 中阻断时可以覆盖为 `error`：

```js
// .stylelintrc.mjs
export default {
  extends: ['hkx-stylelint-config'],
  defaultSeverity: 'error',
};
```

也可以在项目里单独关闭某条规则：

```js
// .stylelintrc.mjs
export default {
  extends: ['hkx-stylelint-config'],
  rules: {
    'color-hex-length': null,
    'selector-max-id': null,
  },
};
```

## 6. 与 Prettier 共存

`hkx-stylelint-config` 不包含 `stylelint-config-prettier`，避免误关样式结构类规则。如果项目同时使用 Prettier 且遇到格式化规则冲突，可以自行追加：

```shell
pnpm add -D stylelint-config-prettier
```

```js
// .stylelintrc.mjs
export default {
  extends: ['hkx-stylelint-config', 'stylelint-config-prettier'],
};
```

::: tip
`hkx-lint-tool` 在选择 Prettier 后会把 `stylelint-config-prettier` 写入 `devDependencies`，但不会自动加进 `extends`，需要按上面的方式手动补上。
:::

## 7. 常见问题

### `.vue` 文件报 `Unknown word` 或解析失败

缺少 `postcss-html`，或没有为 `**/*.vue` 配置 `customSyntax`。

### `--fix` 没有修改任何内容

`length-zero-no-unit` 等规则只报告不自动修复的情况较少，多数问题可以修复；若规则被项目覆盖为 `null`，则不会再报告。

### CI 中 stylelint 退出码为 0 但存在告警

这是 `defaultSeverity: 'warning'` 的预期行为，把严重级别覆盖为 `error` 即可。
