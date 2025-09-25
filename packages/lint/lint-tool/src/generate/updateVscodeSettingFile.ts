// @ts-expect-error missing types
import fs from 'fs-extra';
import path from 'node:path';
import * as p from '@clack/prompts';
import c from 'ansis';

import { PromptResult } from '../types';
import { VSCODE_SETTING_CONTENT } from '../constants';


export default async (result: PromptResult): Promise<void> => {
  if (!result.updateVscodeSetting) {
    return undefined;
  }

  const cwd = process.cwd();

  const dotVscodePath: string = path.join(cwd, '.vscode');
  const settingsPath: string = path.join(dotVscodePath, 'settings.json');

  fs.ensureFileSync(settingsPath);

  let vscodeSettingContent = fs.readFileSync(settingsPath, 'utf-8');
  vscodeSettingContent = vscodeSettingContent.trim().replace(/\s*\}$/, '');
  vscodeSettingContent += vscodeSettingContent.endsWith(',') || vscodeSettingContent.endsWith('{') ? '' : ',';
  vscodeSettingContent += `${VSCODE_SETTING_CONTENT}}\n`;

  fs.writeFile(settingsPath, vscodeSettingContent, 'utf-8');

  p.log.success(c.green`.vscode/settings.json updated!`);
};
