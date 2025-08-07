module.exports = {
  defaultSeverity: 'warning',
  rules: {
    // 不允许未知的 @规则
    'at-rule-no-unknown': null, 
    // 禁止空块
    'block-no-empty': true, 
    // 禁止使用无效的十六进制颜色
    'color-no-invalid-hex': true, 
    // 禁止空注释
    'comment-no-empty': true, 
    // 在声明块中不允许重复属性，忽略值不同的重复属性
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ], 
    // 禁止覆盖相关长手属性的简写属性
    'declaration-block-no-shorthand-property-overrides': true, 
    // 不允许在font-family中使用重复的名称
    'font-family-no-duplicate-names': true, 
    // 不允许在数学函数（如 calc() 或 min()）中使用无效的无空格运算符
    'function-calc-no-unspaced-operator': true, 
    // 禁止在线性渐变函数中使用非标准方向值
    'function-linear-gradient-no-nonstandard-direction': true, 
    // 不允许在关键帧声明中使用无效的 !important
    'keyframe-declaration-no-important': true, 
    // 不允许未知的媒体特性名称
    'media-feature-name-no-unknown': true, 
    // @reason 关闭 实际有很多这样用的，且多数人熟悉 css 优先级 【不允许较低特异性的选择器出现在较高特异性选择器之后】
    'no-descending-specificity': null, 
    // 不允许使用重复的 @import
    'no-duplicate-at-import-rules': true, 
    // 不允许重复的选择器
    'no-duplicate-selectors': true, 
    // 不允许空来源
    'no-empty-source': null, 
    // 不允许使用无效的双斜杠注释
    'no-invalid-double-slash-comments': true, 
    // 不允许未知属性
    'property-no-unknown': true, 
    // 不允许未知的伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local', 'export'],
      },
    ],
    // 不允许未知的伪元素选择器
    'selector-pseudo-element-no-unknown': true,
    // 不允许在字符串中使用无效的换行
    'string-no-newline': true,
    // 不允许未知的单位
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['px'],
      },
    ],
    // 必须写完整的十六进制颜色
    'color-hex-length': 'long',
    // 要求在注释标记内部使用空格
    'comment-whitespace-inside': 'always',
    // 限制单行声明块中的声明数量
    'declaration-block-single-line-max-declarations': 1,
    // 不允许为零长度指定单位
    'length-zero-no-unit': [
      true,
      {
        ignore: ['custom-properties'],
      },
    ],
    // 限制选择器中ID选择器的数量
    'selector-max-id': 0,
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
}