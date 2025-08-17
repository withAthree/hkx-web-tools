import path, { dirname } from 'node:path';
import { ESLint } from 'eslint';
import { fileURLToPath } from 'node:url';

import { it } from 'vitest';

const filename = fileURLToPath(import.meta.url);
const rootDirname = dirname(filename);


it('validate eslint ts', async () => {
  const filePath = path.join(rootDirname, './fixture/es6.js');
  const configPath = path.join(rootDirname, './eslint.config.ts');
  const eslint = new ESLint({
    overrideConfigFile: configPath,
    fix: true,
  });
  const results = await eslint.lintFiles([filePath]);
  console.log(results[0]);
});
