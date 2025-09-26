
import format from 'eslint-plugin-format';

const options = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  endOfLine: 'auto',
  trailingComma: 'all',
};

function mergeOptions(customOptions: any) {
  return {
    ...options,
    ...customOptions,
    plugins: [
      ...customOptions.plugins || [],
    ],
  };
}

export default [
  {
    name: 'eslint-config/formatter/setup',
    plugins: {
      format,
    },
  },
  {
    name: 'eslint-config/formatter/vue',
    files: ['**/*.vue'],
    rules: {
      'format/prettier': ['error', mergeOptions({ parser: 'vue' })],
    },
  },
  {
    name: 'eslint-config/formatter/html',
    files: ['**/*.htm{l}'],
    languageOptions: {
      parser: format.parserPlain,
    },
    rules: {
      'format/prettier': ['error', mergeOptions({ parser: 'html' })],
    },
  },
  {
    name: 'eslint-config/formatter/css',
    files: ['**/*.css', '**/*.{p,post}css'],
    languageOptions: {
      parser: format.parserPlain,
    },
    rules: {
      'format/prettier': ['error', mergeOptions({ parser: 'css' })],
    },
  },
  {
    name: 'eslint-config/formatter/scss',
    files: ['**/*.scss'],
    languageOptions: {
      parser: format.parserPlain,
    },
    rules: {
      'format/prettier': ['error', mergeOptions({ parser: 'scss' })],
    },
  },
  {
    name: 'eslint-config/formatter/less',
    files: ['**/*.less'],
    languageOptions: {
      parser: format.parserPlain,
    },
    rules: {
      'format/prettier': ['error', mergeOptions({ parser: 'less' })],
    },
  },
];
