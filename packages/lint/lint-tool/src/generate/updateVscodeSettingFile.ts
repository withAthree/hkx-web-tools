import path from 'node:path';
import * as p from '@clack/prompts';
import c from 'ansis';

import { PromptResult } from '../types';
import { VSCODE_SETTING_CONTENT } from '../constants';
import {
  ensureDirectory,
  ensureFile,
  readFileSafe,
  parseJsonSafe,
  mergeJson,
  writeFileSafe,
} from '../utils';

/**
 * 更新 VSCode 设置文件
 * @param result 用户选择的配置选项
 */
export default async (result: PromptResult): Promise<void> => {
  if (!result.updateVscodeSetting) {
    return;
  }

  const cwd = process.cwd();
  const dotVscodePath = path.join(cwd, '.vscode');
  const settingsPath = path.join(dotVscodePath, 'settings.json');

  try {
    // 确保 .vscode 目录和 settings.json 文件存在
    await ensureDirectory(dotVscodePath);
    await ensureFile(settingsPath);

    // 读取现有的设置文件内容
    const existingContent = await readFileSafe(
      settingsPath,
      'Settings file not found or unreadable, creating new one.',
    );

    // 解析现有的 JSON 内容
    const existingSettings = parseJsonSafe<Record<string, unknown>>(
      existingContent,
      {},
      'Failed to parse existing settings.json, attempting to merge anyway.',
    );

    // 解析要添加的新设置内容
    let newSettings: Record<string, unknown> = {};
    try {
      newSettings = JSON.parse(`{${VSCODE_SETTING_CONTENT.trim()}}`);
    } catch (error) {
      p.log.error(c.red`Failed to parse VSCODE_SETTING_CONTENT: ${String(error)}`);
      throw error;
    }

    // 合并设置（新设置会覆盖现有设置）
    const mergedSettings = mergeJson(existingSettings, newSettings);

    // 写入合并后的设置
    const mergedContent = `${JSON.stringify(mergedSettings, null, 2)}\n`;
    await writeFileSafe(settingsPath, mergedContent, '.vscode/settings.json', '.vscode/settings.json updated!');
  } catch (error) {
    p.log.error(c.red`Failed to update .vscode/settings.json: ${String(error)}`);
    throw error;
  }
};
