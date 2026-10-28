import { viteBundler } from '@vuepress/bundler-vite';
import { searchPlugin } from '@vuepress/plugin-search';
import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';

export default defineUserConfig({
  // GitHub Pages 部署在 https://withathree.github.io/hkx-web-tools/
  base: '/hkx-web-tools/',
  lang: 'zh-CN',
  title: 'hkx-web-tools',
  description: '前端工程化工具集',

  bundler: viteBundler(),

  theme: defaultTheme({
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '编码规范',
        children: [
          { text: 'HTML 编码规范', link: '/coding/html.md' },
          { text: 'CSS 编码规范', link: '/coding/css.md' },
          { text: 'JavaScript 编码规范', link: '/coding/javascript.md' },
          { text: 'Node 编码规范', link: '/coding/node.md' },
          { text: 'TypeScript 编码规范', link: '/coding/typescript.md' },
        ],
      },
      {
        text: '工程规范',
        children: [
          { text: 'Git 规范', link: '/engineering/git.md' },
          { text: '文档规范', link: '/engineering/doc.md' },
          { text: 'CHANGELOG 规范', link: '/engineering/changelog.md' },
        ],
      },
      {
        text: 'npm 包',
        children: [
          { text: 'hkx-eslint-config', link: '/npm/eslint-config.md' },
          { text: 'hkx-stylelint-config', link: '/npm/stylelint-config.md' },
        ],
      },
      {
        text: '脚手架',
        children: [{ text: 'hkx-lint-tool', link: '/cli/lint-tool.md' }],
      },
    ],
    // 按目录结构自动生成侧边栏
    sidebar: 'auto',
    docsDir: 'docs',
    editLink: false,
    lastUpdated: false,
    contributors: false,
  }),

  plugins: [
    searchPlugin({
      maxSuggestions: 10,
      isSearchable: (page) => page.path !== '/',
    }),
  ],
});
