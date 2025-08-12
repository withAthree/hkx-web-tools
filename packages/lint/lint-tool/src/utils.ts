import { execSync } from 'child_process';

export const getEslintConfigContent = (projectType: string, ignores: string | null): string => `import { defineConfig } from 'eslint/config';
import eslintConfig from 'hkx-eslint-config/${projectType.replace('index', '')}'

export default defineConfig([
  ...eslintConfig,${ignores ? `\n  { ${ignores} }` : ''}
])
`;

export const getEslintConfigVersion = async ():Promise<string> => await execSync('pnpm view hkx-eslint-config version').toString('utf-8').trim();
