import path from 'node:path';

import { PromptResult } from '../types';
import { PRETTIER_RC, PRETTIER_IGNORE_LINES } from '../constants';
import { writeFileSafe } from '../utils';

/**
 * 生成 Prettier 配置文件（.prettierrc、.prettierignore）
 * @param result 用户选择的配置选项
 */
export default async (result: PromptResult): Promise<void> => {
  if (!result.enablePrettier) {
    return;
  }

  const cwd = process.cwd();
  const pathPrettierrc = path.join(cwd, '.prettierrc');
  const pathPrettierignore = path.join(cwd, '.prettierignore');

  await writeFileSafe(pathPrettierrc, PRETTIER_RC, '.prettierrc', '.prettierrc created!');
  await writeFileSafe(
    pathPrettierignore,
    `${PRETTIER_IGNORE_LINES.join('\n')}\n`,
    '.prettierignore',
    '.prettierignore created!',
  );
};
