import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    name: 'rules/jsx-a11y',
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // 确保所有需要替代文本的元素都包含有意义的信息，以便向最终用户传达。
      'jsx-a11y/alt-text': 'warn',

      // 强制要求<img>的alt属性不得包含"image"、"picture"或"photo"等词语。
      'jsx-a11y/img-redundant-alt': 'warn',

      // 强制所有锚点必须包含可访问的内容。
      'jsx-a11y/anchor-has-content': 'warn',

      // 强制所有 aria-* 属性必须有效
      'jsx-a11y/aria-props': 'warn',

      // 确保ARIA状态和属性值是有效的。
      'jsx-a11y/aria-proptypes': 'warn',

      // 强制要求不支持ARIA角色、状态和属性的元素不得包含这些属性。
      'jsx-a11y/aria-unsupported-elements': 'warn',

      /*
       * 强制要求具有ARIA角色的元素必须使用有效且非抽象的ARIA角色。
       * ignoreNonDom 为 true 时不检查用户自定义元素
       */
      'jsx-a11y/aria-role': ['warn', { ignoreNonDOM: true }],

      // 强制要求具有ARIA角色的元素必须拥有该角色所需的所有属性。
      'jsx-a11y/role-has-required-aria-props': 'warn',

      // 强制要求具有明确定义或隐式角色的元素仅包含该角色支持的aria-*属性。
      'jsx-a11y/role-supports-aria-props': 'warn',

      // 强制要求 iframe 元素必须具有 title 属性
      'jsx-a11y/iframe-has-title': 'warn',

      // 强制要求在任何元素上不使用accessKey属性，以避免与屏幕阅读器使用的键盘命令产生冲突。
      'jsx-a11y/no-access-key': 'warn',

      // 禁止使用分散注意力的元素。
      'jsx-a11y/no-distracting-elements': 'warn',

      // 强制 scope 属性仅用于 <th> 元素。
      'jsx-a11y/scope': 'warn',
    },
  },
];
