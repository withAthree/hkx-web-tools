import { jest, test } from '@jest/globals';
import path, { dirname } from 'node:path'
import { ESLint } from 'eslint'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url); // 当前文件的绝对路径
const __dirname = dirname(__filename);             // 当前文件所在的目录


test('validate eslint es6', async () => {
  const filePath = path.join(__dirname, './fixture/es6.js');
  const configPath = path.join(__dirname, "../index.js");

  const eslint = new ESLint({
    overrideConfigFile: configPath,
    fix: false
  });

  const config = await eslint.calculateConfigForFile(filePath);
  expect(typeof config === 'object').toBe(true)
  
  const results = await eslint.lintFiles([filePath]);
  const { errorCount, warningCount } = results[0]
  expect(errorCount).toBe(1)
  expect(warningCount).toBe(1)
})

test('validate eslint best-practices', async () => {
  const filePath = path.join(__dirname, './fixture/best-practices.js');
  const configPath = path.join(__dirname, "../index.js");

  const eslint = new ESLint({
    overrideConfigFile: configPath,
    fix: false
  });

  const config = await eslint.calculateConfigForFile(filePath);
  expect(typeof config === 'object').toBe(true)
  
  const results = await eslint.lintFiles([filePath]);
  const { errorCount, warningCount } = results[0]
  expect(errorCount).toBe(1)
  expect(warningCount).toBe(2)
})