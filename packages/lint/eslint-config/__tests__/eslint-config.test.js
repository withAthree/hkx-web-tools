import { jest, test } from '@jest/globals';
import path, { dirname } from 'node:path'
import { ESLint } from 'eslint'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url); // 当前文件的绝对路径
const __dirname = dirname(__filename);             // 当前文件所在的目录

// test('validate eslint import', async () => {
//   const filePath = path.join(__dirname, './fixture/typescript.tsx');
//   const configPath = path.join(__dirname, "./eslint.config.js");
//
//   const eslint = new ESLint({
//     overrideConfigFile: configPath,
//     fix: false
//   });
//
//   const config = await eslint.calculateConfigForFile(filePath);
//   expect(typeof config === 'object').toBe(true)
//
//
//   const results = await eslint.lintFiles([filePath]);
//   console.log(123, results[0])
//   const { errorCount, warningCount } = results[0]
//   expect(errorCount).toBe(3)
//   expect(warningCount).toBe(1)
// })

test('validate eslint ts', async () => {
  const filePath = path.join(__dirname, './fixture/es6.js');
  const configPath = path.join(__dirname, "./eslint.config.js");
  const eslint = new ESLint({
    overrideConfigFile: configPath,
    fix: true
  });
  const results = await eslint.lintFiles([filePath]);
  console.log(results[0])
})