import importPlugin from 'eslint-plugin-import';

export default [
  {
    name: 'rules/import',
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/ignore': [
        'node_modules',
        '\\.(coffee|scss|css|less|hbs|svg|json)$',
      ],
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
          ],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
        },
      },
    },
    rules: {
      /**
       * 静态分析
       */
      // 确保导入指向可以解析的文件/模块
      'import/no-unresolved': 'error',

      // 确保命名导入与命名导出配对
      'import/named': 'error',

      // 确保默认导入与默认导出配对
      'import/default': 'error',

      // 确保导入的命名空间包含被解引用的属性
      'import/namespace': 'error',

      /**
       * 有用的警告
       */

      // 禁止任何无效的导出，例如相同名称的重新导出
      'import/export': 'error',

      // 禁止将导出的名称用作默认导出的标识符
      'import/no-named-as-default': 'error',

      // 禁止将导出的名称用作默认导出的属性
      'import/no-named-as-default-member': 'warn',

      // 禁止导入标记为@deprecated文档标签的名称
      'import/no-deprecated': 'off',

      // 禁止使用外部包
      'import/no-extraneous-dependencies': 'off',

      // 禁止使用var或let的可变导出
      'import/no-mutable-exports': 'off',

      /**
       * 模块系统
       */

      // 报告可能模糊的解析目标(script vs. module)
      'import/unambiguous': 'off',

      // 禁止CommonJS 调用 require 和 module.exports 以及 exports.*
      'import/no-commonjs': 'off',

      // 禁止AMD的require和define调用
      'import/no-amd': 'warn',

      // 禁止Node.js内置模块
      'import/no-nodejs-modules': 'off',

      /**
       * 风格指南
       */

      /*
       * 确保所有导入出现在其他语句之前fix
       * @unessential
       */
      'import/first': 'error',

      // 禁止在多个地方重复导入同一模块fix
      'import/no-duplicates': 'error',

      // 禁止命名空间(即'通配符'*)导入fix
      'import/no-namespace': 'off',

      // 确保在导入路径中一致使用文件扩展名
      'import/extensions': 'off',

      // 强制模块导入顺序的约定fix
      'import/order': [
        'off',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'never',
        },
      ],

      // 强制在导入语句后换行fix
      'import/newline-after-import': 'warn',

      // 如果模块导出单个名称或多个名称，则优先使用默认导出
      'import/prefer-default-export': 'off',

      // 强制在给定文件夹中可以导入哪些文件
      'import/no-restricted-paths': 'off',

      // 强制模块可以具有的最大依赖项数
      'import/max-dependencies': ['off', { max: 10 }],

      // 禁止使用绝对路径导入模块fix
      'import/no-absolute-path': 'off',

      // 禁止使用表达式的require()调用
      'import/no-dynamic-require': 'off',

      // 禁止导入其他模块的子模块
      'import/no-internal-modules': [
        'off',
        {
          allow: [],
        },
      ],

      // 禁止在导入中使用Webpack加载器语法
      'import/no-webpack-loader-syntax': 'off',

      /*
       * 防止未分配的导入
       * 如果需要副作用，导入副作用是完全可接受的
       */
      'import/no-unassigned-import': 'off',

      /*
       * 禁止 import { default as foo } from './foo.js'
       * 应该写成 import foo from './foo.js'
       */
      'import/no-named-default': 'error',

      // 禁止匿名值作为默认导出
      'import/no-anonymous-default-export': [
        'off',
        {
          allowArray: false,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowLiteral: false,
          allowObject: false,
        },
      ],

      // 确保所有导出出现在其他语句之后
      'import/exports-last': 'off',

      // 优先将命名导出分组在单个导出声明中
      'import/group-exports': 'off',

      // 禁止默认导出这是一个糟糕的规则，不要使用它
      'import/no-default-export': 'off',

      // 禁止模块导入自身
      'import/no-self-import': 'error',

      // 不要产生循环引用
      'import/no-cycle': ['error', { maxDepth: Infinity }],

      // 禁止在导入和require语句中使用不必要的路径段fix
      'import/no-useless-path-segments': 'off',

      // 强制在动态导入中使用带有webpackChunkName的前导注释
      'import/dynamic-import-chunkname': [
        'off',
        {
          importFunctions: [],
          webpackChunknameFormat: '[0-9a-zA-Z-_/.]+',
        },
      ],

      // 禁止从父目录导入模块
      'import/no-relative-parent-imports': 'off',
    },
  },
];
