import { it } from 'vitest';

import stylelint from 'stylelint';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const rootDirname = dirname(filename);

it('validate default', async () => {
  const filePaths = [path.join(rootDirname, './fixture/test.vue')];

  const result = await stylelint.lint({
    configFile: path.join(rootDirname, '../index.js'),
    files: filePaths,
    fix: false,
  });

  const filesResult = JSON.parse(result.output || '[]') || [];
  filesResult.forEach((fileResult) => {
    console.log(`========= ${filePaths} ==========`);
    console.log(fileResult.warnings);
  });
});
