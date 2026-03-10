import stylistic from '@stylistic/eslint-plugin';
import eslintReact from '@eslint-react/eslint-plugin';
import { RuleConfig } from '../../type';

export const name = 'rules/react';

const domConfig = eslintReact.configs.dom as { plugins: Record<string, unknown> };
export const plugins = {
  '@stylistic': stylistic,
  '@eslint-react': eslintReact,
  '@eslint-react/dom': domConfig.plugins['@eslint-react/dom'],
};

export const rules = {
  '@stylistic/jsx-closing-bracket-location': [2, 'line-aligned'],
  // JSX 语法闭合标签的缩进和换行 fix
  '@stylistic/jsx-closing-tag-location': 2,
  // JSX 属性的大括号内部两侧无空格 fix
  '@stylistic/jsx-curly-spacing': [
    2,
    { when: 'never', allowMultiline: true },
  ],
  // 不要在 JSX 属性的等号两边加空格
  '@stylistic/jsx-equals-spacing': [2, 'never'],
  // 设置第一个属性的位置
  '@stylistic/jsx-first-prop-new-line': [2, 'multiline-multiprop'],
  // JSX 使用 2 个空格缩进
  '@stylistic/jsx-indent': [2, 2],
  // JSX 属性使用 2 个空格缩进 fix
  '@stylistic/jsx-indent-props': [2, 2],
  // 标签属性的换行，如果标签有多个属性，且存在换行，则每个属性都需要换行独占一行 fix
  '@stylistic/jsx-max-props-per-line': [
    2,
    { maximum: 1, when: 'multiline' },
  ],
  // JSX 行内属性间仅有一个空格 fix
  '@stylistic/jsx-props-no-multi-spaces': 2,
  // 属性按首字母排序
  '@stylistic/jsx-sort-props': 0,
  // 自闭合标签的斜线前有且仅有一个空格
  '@stylistic/jsx-tag-spacing': [
    2,
    {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
    },
  ],
  // 多行的 JSX 标签需用小括号包裹
  '@stylistic/jsx-wrap-multilines': [
    2,
    {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
    },
  ],
  // 无子元素的标签需写成自闭合标签 fix
  '@stylistic/jsx-self-closing-comp': 2,
  // 防止 React 组件定义中缺少 displayName
  '@eslint-react/no-missing-component-display-name': 1,
  '@eslint-react/no-missing-context-display-name': 1,
  // JSX 语法检查数组和迭代器的 key
  '@eslint-react/no-missing-key': 0,
  '@eslint-react/no-duplicate-key': 0,
  // JSX 语句的文本节点中不要使用注释字符串（例如，以//或/ *开头）
  '@eslint-react/jsx-no-comment-textnodes': 2,
  // 不要在 setState 中使用 this.state
  '@eslint-react/no-access-state-in-setstate': 2,
  // 不要用数组索引作为 map 元素的 key
  '@eslint-react/no-array-index-key': 1,
  // 禁止将 children 作为属性名
  '@eslint-react/no-children-prop': 2,
  // 禁止使用已经废弃的方法
  '@eslint-react/no-component-will-mount': 2,
  '@eslint-react/no-component-will-receive-props': 2,
  '@eslint-react/no-component-will-update': 2,
  // 使用 this.state 获取状态，用 setState 改变状态；不能用 this.state 赋值改变状态
  '@eslint-react/no-direct-mutation-state': 0,
  // 在扩展 React.PureComponent 时禁止使用 shouldComponentUpdate
  '@eslint-react/no-redundant-should-component-update': 2,
  // 使用 ref 回调函数或 React.createRef()，不要使用字符串
  '@eslint-react/no-string-refs': 2,
  // 声明的 state 必须被使用
  '@eslint-react/no-unused-state': 2,
  // 不要在 componentWillUpdate 内改变 state 值
  '@eslint-react/no-set-state-in-component-will-update': 2,
  // ---- react-hooks ----
  // "@eslint-react/rules-of-hooks": 2,
  // "@eslint-react/exhaustive-deps": 1,
  // 不要使用危险属性
  '@eslint-react/dom/no-dangerously-set-innerhtml': 1,
  // 禁止在有子节点的组件或 DOM 元素中使用 dangerouslySetInnerHTML 属性
  '@eslint-react/dom/no-dangerously-set-innerhtml-with-children': 2,
  // style 的属性值必须是一个对象
  '@eslint-react/dom/no-string-style-prop': 2,
  // HTML 自闭标签不能有子节点
  '@eslint-react/dom/no-void-elements-with-children': 2,
  // 不要单独使用 target='_blank'
  '@eslint-react/dom/no-unsafe-target-blank': 1,
  // 在JSX中，所有DOM属性和属性命名都应该是小驼峰 fix CLI
  '@eslint-react/dom/no-unknown-property': 2,
  // 不要使用 findDOMNode，严格模式下已经弃用
  '@eslint-react/dom/no-find-dom-node': 2,
  // 禁止使用 ReactDOM.render 的返回值
  '@eslint-react/dom/no-render-return-value': 2,
} as const satisfies Record<string, RuleConfig>;

