import path from 'node:path';
import type { Config } from 'stylelint';

import { PromptResult } from '../types';
import { writeFileSafe, isVueProject } from '../utils';

/**
 * 生成 Stylelint 配置文件
 * @param result 用户选择的配置选项
 */
export default async (result: PromptResult): Promise<void> => {
  const { projectType, enableStylelint } = result;

  if (!enableStylelint) {
    return;
  }

  const cwd = process.cwd();
  const configFileName = '.stylelintrc.mjs';
  const pathConfig = path.join(cwd, configFileName);

  // 构建 stylelint 配置
  const config: Config = {
    extends: ['hkx-stylelint-config'],
  };

  // 如果是 Vue 项目，添加 Vue 文件的支持配置
  if (isVueProject(projectType)) {
    config.overrides = [
      {
        files: ['**/*.vue'],
        customSyntax: 'postcss-html',
      },
    ];
  }

  // 生成配置文件内容（ESM 格式）
  const configContent = `export default ${JSON.stringify(config, null, 2)};\n`;

  // 写入配置文件
  await writeFileSafe(pathConfig, configContent, configFileName);
};
