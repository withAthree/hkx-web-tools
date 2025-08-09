import stylistic from '@stylistic/eslint-plugin';

export default [
  {
    name: 'rules/base/style',
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // 强制在数组开括号后和闭括号前换行 fix
      '@stylistic/array-bracket-newline': 'off',

      // 方括号内部两侧无空格-数组 fix
      '@stylistic/array-bracket-spacing': ['error', 'never'],

      // 强制数组元素间换行 fix
      '@stylistic/array-element-newline': 'off',

      // 单行代码块的大括号内部两侧有空格 fix
      '@stylistic/block-spacing': ['error', 'always'],

      // 大括号换行风格：one true brace style 风格，且单行代码块可不换行 fix
      '@stylistic/brace-style': [
        'error',
        '1tbs',
        { allowSingleLine: true },
      ],

      // 用逗号分隔的多行结构，始终加上最后一个逗号（单行不用） fix
      '@stylistic/comma-dangle': ['error', 'always-multiline'],

      // 逗号的前面无空格，后面有空格 fix
      '@stylistic/comma-spacing': [
        'error',
        { before: false, after: true },
      ],

      // 用逗号分隔的多行结构，将逗号放到行尾 fix
      '@stylistic/comma-style': ['error', 'last'],

      // 方括号内部两侧无空格-计算属性 fix
      '@stylistic/computed-property-spacing': ['error', 'never'],

      // 在文件末尾保留一行空行 fix
      '@stylistic/eol-last': ['warn', 'always'],

      // 函数名与调用它的括号间无空格 fix
      '@stylistic/function-call-spacing': ['error', 'never'],

      // 在函数的小括号内使用一致的换行风格 fix
      '@stylistic/function-paren-newline': ['error', 'consistent'],

      // 隐式返回的箭头函数体不要换行 fix
      '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],

      // 使用 2 个空格缩进 fix
      '@stylistic/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
          // MemberExpression: null,
          FunctionDeclaration: {
            parameters: 1,
            body: 1,
          },
          FunctionExpression: {
            parameters: 1,
            body: 1,
          },
          CallExpression: {
            arguments: 1,
          },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
          flatTernaryExpressions: false,
          // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
          ignoredNodes: [
            'JSXElement',
            'JSXElement > *',
            'JSXAttribute',
            'JSXIdentifier',
            'JSXNamespacedName',
            'JSXMemberExpression',
            'JSXSpreadAttribute',
            'JSXExpressionContainer',
            'JSXOpeningElement',
            'JSXClosingElement',
            'JSXText',
            'JSXEmptyExpression',
            'JSXSpreadChild',
          ],
          ignoreComments: false,
        },
      ],

      // JSX 属性使用双引号，不要使用单引号 fix
      // @unessential
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],

      // 定义对象字面量时，key, value 之间有且只有一个空格 fix
      '@stylistic/key-spacing': [
        'error',
        { beforeColon: false, afterColon: true },
      ],

      // 关键字前后各一个空格 fix
      '@stylistic/keyword-spacing': [
        'error',
        {
          before: true,
          after: true,
          overrides: {
            return: { after: true },
            throw: { after: true },
            case: { after: true },
          },
        },
      ],

      // 单行注释应单独一行写在被注释对象的上方，不要追加在某条语句的后面 fix
      '@stylistic/line-comment-position': [
        'error',
        {
          position: 'above',
          ignorePattern: '',
          applyDefaultIgnorePatterns: true,
        },
      ],

      // 指定 unix 或 windows 风格的换行符 fix
      '@stylistic/linebreak-style': ['error', 'unix'],

      // 类成员之间保留一个空行 fix
      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: false },
      ],

      // 要求在注释周围有空行 fix
      '@stylistic/lines-around-comment': 'off',

      // 单行最大字符数：100 fix
      '@stylistic/max-len': [
        'warn',
        100,
        2,
        {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],

      // 每一行中所允许的最大语句数量 fix
      '@stylistic/max-statements-per-line': ['warn', { max: 1 }],

      // 多行注释的风格 fix
      '@stylistic/multiline-comment-style': ['warn', 'starred-block'],

      // 要求或禁止在三元操作数中间换行 fix
      '@stylistic/multiline-ternary': ['error', 'never'],

      // 禁止在调用构造函数时省略小括号 fix
      '@stylistic/new-parens': 'error',

      // 在长方法链式调用时进行换行 fix
      '@stylistic/newline-per-chained-call': [
        'warn',
        { ignoreChainWithDepth: 4 },
      ],

      // 混合使用多种操作符时，用小括号包裹分组 fix
      '@stylistic/no-mixed-operators': [
        'error',
        {
          groups: [
            ['%', '**'],
            ['%', '+'],
            ['%', '-'],
            ['%', '*'],
            ['%', '/'],
            ['**', '+'],
            ['**', '-'],
            ['**', '*'],
            ['**', '/'],
            ['&', '|', '^', '~', '<<', '>>', '>>>'],
            ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
            ['&&', '||'],
            ['in', 'instanceof'],
          ],
          allowSamePrecedence: false,
        },
      ],

      // 不要混用空格和 tab fix
      '@stylistic/no-mixed-spaces-and-tabs': 'error',

      // 禁止出现多个（大于 2 个）连续空行 fix
      '@stylistic/no-multiple-empty-lines': [
        'error',
        { max: 2, maxEOF: 1 },
      ],

      // 禁止使用 tab fix
      '@stylistic/no-tabs': 'error',

      // 行尾不要留有空格 fix
      '@stylistic/no-trailing-spaces': [
        'error',
        {
          skipBlankLines: false,
          ignoreComments: false,
        },
      ],

      // 禁止属性调用前有空格 fix
      '@stylistic/no-whitespace-before-property': 'error',

      // 省略大括号的单行语句前不要换行 fix
      '@stylistic/nonblock-statement-body-position': [
        'error',
        'beside',
        { overrides: {} },
      ],

      // 强制大括号内换行符的一致性 fix
      '@stylistic/object-curly-newline': 'off',

      // 大括号内部两侧有空格 fix
      '@stylistic/object-curly-spacing': ['error', 'always'],

      // 对象的属性需遵循一致的换行风格：即所有属性要么都换行，要么都写在一行 fix
      '@stylistic/object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: true,
        },
      ],

      // 一行声明一个变量 fix
      '@stylistic/one-var-declaration-per-line': ['error', 'always'],

      // 强制操作符使用一致的换行符 fix
      '@stylistic/operator-linebreak': 'off',

      // 块的开始和结束不能是空行 fix
      '@stylistic/padded-blocks': [
        'warn',
        { blocks: 'never', classes: 'never', switches: 'never' },
      ],

      // 要求或禁止在语句间填充空行
      '@stylistic/padding-line-between-statements': 'off',

      // 对象字面量的属性名不要用引号包裹，除非包含特殊字符 fix
      '@stylistic/quote-props': [
        'error',
        'as-needed',
        { keywords: false, unnecessary: true, numbers: false },
      ],

      // 字符串优先使用单引号 fix
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],

      // 使用分号
      // @unessential
      '@stylistic/semi': ['error', 'always'],

      // 分号的前面无空格，后面有空格
      '@stylistic/semi-spacing': [
        'error',
        { before: false, after: true },
      ],

      // 分号必须写在行尾
      // @unessential
      '@stylistic/semi-style': ['error', 'last'],

      // 块的左大括号前有一个空格 fix
      '@stylistic/space-before-blocks': 'error',

      // 函数声明时，对于命名函数，参数的小括号前无空格；对于匿名函数和 async 箭头函数，参数的小括号前有空格 fix
      '@stylistic/space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],

      // 小括号内部两侧无空格 fix
      '@stylistic/space-in-parens': ['error', 'never'],

      // 中缀操作符两侧有空格
      '@stylistic/space-infix-ops': 'error',

      // 一元操作符两侧无空格，包括 -、+、--、++、!、!! fix
      '@stylistic/space-unary-ops': [
        'error',
        {
          words: true,
          nonwords: false,
          overrides: {},
        },
      ],

      // 注释内容和注释符之间需留有一个空格
      '@stylistic/spaced-comment': [
        'error',
        'always',
        {
          line: {
            exceptions: ['-', '+'],
            markers: ['=', '!', '/'],
          },
          block: {
            exceptions: ['-', '+'],
            markers: ['=', '!'],
            balanced: true,
          },
        },
      ],

      // switch 的 case 和 default 子句冒号前面无空格，后面有空格 fix
      '@stylistic/switch-colon-spacing': [
        'error',
        { after: true, before: false },
      ],

      // 模板字符串的 tag 后面无空格 fix
      '@stylistic/template-tag-spacing': ['error', 'never'],

      // 要求正则表达式被括号括起来
      '@stylistic/wrap-regex': 'off',

      // 强制或禁止对注释的第一个字母大写 fix
      'capitalized-comments': 'off',

      // 使用小驼峰命名风格
      camelcase: 'off',

      // 使用一致的 this 别名
      'consistent-this': 'off',

      // 要求函数名与赋值给它们的变量名或属性名相匹配
      'func-name-matching': [
        'off',
        'always',
        {
          includeCommonJSModuleExports: false,
        },
      ],

      // 要求或禁止命名的函数表达式
      'func-names': 'off',

      // 强制只能使用函数声明或函数表达式
      'func-style': 'off',

      // 禁止指定的标识符
      'id-denylist': 'off',

      // 强制标识符的最小和最大长度
      'id-length': 'off',

      // 要求标识符匹配一个指定的正则表达式
      'id-match': 'off',

      // 控制语句的嵌套层级不要过深，不要超过 4 级
      // @reason 适合做后置检查
      'max-depth': ['off', 4],

      // 文件最大行数：1000
      // @reason 适合做后置检查
      'max-lines': [
        'off',
        {
          max: 1000,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      // 函数最大行数：80
      // @reason 适合做后置检查
      'max-lines-per-function': [
        'off',
        {
          max: 80,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],

      // 回调函数最大嵌套深度
      'max-nested-callbacks': 'off',

      // 函数参数数量上限
      'max-params': ['off', 3],

      // 函数块最多允许的的语句数量
      'max-statements': ['off', 10],

      // 使用大驼峰风格命名类和构造函数
      'new-cap': [
        'error',
        {
          newIsCap: true,
          newIsCapExceptions: [],
          capIsNew: false,
          capIsNewExceptions: [
            'Immutable.Map',
            'Immutable.Set',
            'Immutable.List',
          ],
        },
      ],

      // 不要使用 new Array() 和 Array() 创建数组，除非为了构造某一长度的空数组 fix
      'no-array-constructor': 'error',

      // 不要使用按位操作符
      'no-bitwise': 'warn',

      // 禁用 continue 语句
      'no-continue': 'off',

      // 禁止行内注释
      'no-inline-comments': 'off',

      // 禁止 if 作为唯一语句出现在 else 中，此时应写成 else if fix
      'no-lonely-if': 'error',

      // 禁止连续赋值
      'no-multi-assign': 'error',

      // 禁用否定的表达式
      'no-negated-condition': 'off',

      // 不要使用嵌套的三元表达式
      'no-nested-ternary': 'error',

      // 使用字面量创建对象
      'no-object-constructor': 'error',

      // 不要使用一元自增自减运算符
      'no-plusplus': ['off', { allowForLoopAfterthoughts: true }],

      // 禁用特定的语法
      'no-restricted-syntax': 'off',

      // 禁用三元操作符
      'no-ternary': 'off',

      // 命名不要以下划线开头或结尾
      'no-underscore-dangle': 'warn',

      // 避免不必要的三元表达式 fix
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],

      // 一条声明语句声明一个变量 fix
      'one-var': ['error', 'never'],

      // 尽可能使用简写形式的赋值操作符 fix
      'operator-assignment': ['warn', 'always'],

      // 使用扩展运算符替代 Object.assign fix
      'prefer-object-spread': 'off',

      // 要求对对象属性名排序
      'sort-keys': [
        'off',
        'asc',
        { caseSensitive: false, natural: true },
      ],

      // 要求对变量声明排序 fix
      'sort-vars': 'off',

      // 要求或禁止 Unicode 字节顺序标记 (BOM) fix
      'unicode-bom': ['off', 'never'],
    },
  },
];
