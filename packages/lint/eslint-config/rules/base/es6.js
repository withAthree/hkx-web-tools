import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      // 该规则可以强制或禁止在箭头函数体周围使用大括号 fix
      'arrow-body-style': [
        'error',
        'as-needed',
        { "requireReturnForObjectLiteral": false }
      ],

      // 子类的 constructor 中必须使用 super，非子类的 constructor 中不能使用 super
      'constructor-super': 'error',

      // 禁止重新分配类成员
      'no-class-assign': 'error',

      // 禁止重新分配 const 变量
      'no-const-assign': "error",

      // 禁止类成员中出现重复的名称
      'no-dupe-class-members': "error",

      // 不允许重复导入模块
      'no-duplicate-imports': "error",

      // 禁止使用全局非构造函数的新运算符
      'no-new-native-nonconstructor': 'error',

      // 禁止在通过导入加载时使用指定模块
      'no-restricted-imports': ['off', { paths: [], patterns: [] }],

      // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
      'no-this-before-super': 'error',

      // 不允许在对象和类中使用不必要的计算属性键 fix
      'no-useless-computed-key': 'error',

      // 不允许不必要的构造函数
      'no-useless-constructor': "error",

      // 不允许将导入、导出和解构赋值的变量重命名为相同的名称 fix
      "no-useless-rename": ["error", {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false
      }],

      // 不允许使用 var 声明变量 fix
      'no-var': 'error',

      // 要求或禁止对象字面量中的方法和属性的简写语法 fix
      'object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true }],

      // 要求回调函数使用箭头函数 fix
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],

      // 要求为声明后不再重新赋值的变量使用 const 声明 fix
      'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: true }],

      // 需要从数组和/或对象中进行解构 fix
      'prefer-destructuring': ['warn',
        {
          VariableDeclarator: {
            array: false,
            object: true
          },
          AssignmentExpression: {
            array: false,
            object: false
          },
        },
        {
          enforceForRenamedProperties: false,
        }
      ],

      // 禁止使用 parseInt() 进行二、八、十六禁止转换 fix
      'prefer-numeric-literals': 'off',

      // 要求使用剩余参数而不是 arguments
      'prefer-rest-params': 'warn',

      // 要求使用扩展运算符而非.apply()
      'prefer-spread': 'warn',

      // 要求使用模板字面量而非字符串连接 fix
      'prefer-template': 'warn',

      // 要求生成器函数包含 yield
      'require-yield': 'error',

      // import 排序 fix
      'sort-imports': ['warn', {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false
      }],

      // 创建 Symbol 时必须传入参数
      'symbol-description': 'warn',

      // 该规则强制要求箭头函数的参数无论数量多少都必须用括号括起来 fix
      '@stylistic/arrow-parens': ['warn', 'always'],

      // 该规则用于规范化箭头函数箭头（=>）前后的空格样式 fix
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],

      // generator 函数的 * 号前面无空格，后面有一个空格 fix
      '@stylistic/generator-star-spacing': ['error', { before: false, after: true }],

      // 箭头函数（=>）在语法上与某些比较运算符（>、<、<= 和 >=）相似。该规则警告不要在可能被误认为比较运算符的地方使用箭头函数语法 fix
      '@stylistic/no-confusing-arrow': 'error',

      // 剩余和扩展操作符与操作对象间不应有空格 fix
      '@stylistic/rest-spread-spacing': ['error', 'never'],

      // 模板字符串两侧无空格 fix
      '@stylistic/template-curly-spacing': 'warn',

      // 该规则强制在 yield* 表达式中的 * 周围添加空格 fix
      '@stylistic/yield-star-spacing': ['error', 'after'],
    }
  }
]