import path from 'node:path';

import { PromptResult } from '../types';
import { MARKDOWNLINT_CONFIG } from '../constants';
import { ensureFile, writeFileSafe } from '../utils';

/**
 * 生成 Markdownlint 配置文件
 * @param result 用户选择的配置选项
 */
export default async (result: PromptResult): Promise<void> => {
  if (!result.enableMarkdownlint) {
    return;
  }

  const cwd = process.cwd();
  const configPath = path.join(cwd, '.markdownlint.json');

  // 确保文件存在
  await ensureFile(configPath);

  // 写入配置文件
  await writeFileSafe(configPath, MARKDOWNLINT_CONFIG, '.markdownlint.json', '.markdownlint.json updated!');
};
