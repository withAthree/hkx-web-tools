import stylistic from '@stylistic/eslint-plugin';

export default [
  {
    name: 'rules/base/possible-errors',
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // 强制循环更新子句使计数器朝正确方向移动
      'for-direction': 'error',

      // 在getter方法中强制执行return语句
      'getter-return': ['error', { allowImplicit: true }],

      // 不要使用 async 函数作为 Promise 的 executor
      'no-async-promise-executor': 'error',

      // 不要在循环中使用 await，应使用 Promise.all()
      'no-await-in-loop': 'warn',

      // 不允许与 -0 进行比较
      'no-compare-neg-zero': 'error',

      // 不允许在条件表达式中使用赋值运算符
      'no-cond-assign': ['error', 'always'],

      // 生产环境禁止使用 console
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // 禁止在条件中使用常量表达式
      'no-constant-condition': 'warn',

      // 禁止在正则中使用 ctrl 键的 ASCII 码
      'no-control-regex': 'off',

      // 禁止使用 debugger
      'no-debugger': 'error',

      // 不允许在函数定义中出现重复参数
      'no-dupe-args': 'error',

      // 不允许在对象字面量中使用重复键
      'no-dupe-keys': 'error',

      // switch 语句中禁止出现重复的 case
      'no-duplicate-case': 'error',

      // 不允许空块语句
      'no-empty': 'error',

      // 禁止在正则中使用空字符集 []，这不能匹配任何字符，可能是 typo
      'no-empty-character-class': 'error',

      // 禁止对 catch 的入参重新赋值
      'no-ex-assign': 'error',

      // 避免不必要的布尔类型转换 fix
      'no-extra-boolean-cast': 'error',

      // 不要对函数声明重新赋值
      'no-func-assign': 'error',

      // 不允许在嵌套块中声明变量或函数
      'no-inner-declarations': 'error',

      // 禁止在 RegExp 构造函数中使用无效的正则表达式
      'no-invalid-regexp': 'error',

      // 不允许不规则的空格
      'no-irregular-whitespace': 'error',

      // 禁止在正则的字符集语法 [] 中使用由多个字符点构成的字符
      'no-misleading-character-class': 'error',

      // 禁止将全局对象 Math、JSON、Reflect 当作函数进行调用
      'no-obj-calls': 'error',

      // 禁止直接在对象上调用某些 Object.prototype 方法
      'no-prototype-builtins': 'error',

      // 禁止在正则表达式中出现多个连续空格 fix
      'no-regex-spaces': 'error',

      // 禁用稀疏数组，如 var items = [,,];
      'no-sparse-arrays': 'error',

      /*
       * 不要在普通字符串中出现模板字符串占位语法，如 'Hello ${name}!'，旨在防错写。
       * 但不排除有时普通字符串内容就是这样，因此这条开为 warn 级别
       */
      'no-template-curly-in-string': 'warn',

      // 禁止使用令人困惑的多行表达式
      'no-unexpected-multiline': 'error',

      // 禁止在return、throw、continue和break语句后出现无法访问的代码
      'no-unreachable': 'error',

      // 禁止在 finally 中出现控制流语句，如 return, throw, break 或 continue
      'no-unsafe-finally': 'error',

      // 禁止对关系运算符左边的运算元使用否定操作符，包括 in 和 instanceof
      'no-unsafe-negation': 'error',

      // 避免因使用 await 或 yield 导致的竞争性赋值
      'require-atomic-updates': 'warn',

      // 使用 Number.isNaN()，而不是直接与 NaN 进行比较
      'use-isnan': 'error',

      /*
       * 同 typeof 表达式结果进行比较的值必须是有效的字符串
       * 即 'undefined', 'object', 'boolean', 'number', 'string', 'function' 或 'symbol'
       */
      'valid-typeof': ['error', { requireStringLiterals: true }],

      // 禁止不必要的小括号 fix
      '@stylistic/no-extra-parens': [
        'error',
        'all',
        {
          conditionalAssign: true,
          nestedBinaryExpressions: false,
          returnAssign: false,
          ignoreJSX: 'all',
          enforceForArrowConditionals: false,
        },
      ],

      // 禁止不必要的分号 fix
      '@stylistic/no-extra-semi': 'error',
    },
  },
];
