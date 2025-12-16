import { execSync } from 'child_process';

/**
 * @description 生成 ESLint 配置文件内容
 * @param projectType 项目类型
 * @param ignores 忽略配置
 * @param extraFormatter 是否启用额外的格式化工具
 * @returns ESLint 配置文件内容
 */
export const getEslintConfigContent = (projectType: string, ignores: string | null, extraFormatter: boolean): string => `import { defineConfig } from 'eslint/config';
import eslintConfig from 'hkx-eslint-config${projectType.includes('index') ? '' : '/'}${projectType.replace('index', '')}'
${extraFormatter ? "import formatter from 'hkx-eslint-config/formatter';" : ''}

export default defineConfig([
  ...eslintConfig${ignores ? `,\n  { ${ignores} }` : ''}${extraFormatter ? ',\n  ...formatter' : ''}
])
`;

/**
 * @description 获取指定包的最新版本号
 * @param packageName 包名
 * @returns 返回包的版本号
 * @throws 如果包不存在或命令执行失败则抛出错误
 */
export const getPackageVersion = async (packageName: string): Promise<string> => {
  /**
   * 验证包名格式，防止命令注入
   * 支持标准 npm 包名格式：普通包名、scoped 包名（@scope/package）
   * 允许字符：字母、数字、连字符、下划线、点号、波浪号
   * scoped 包名格式：@scope/package-name
   */
  const validPackageNameRegex = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/i;

  if (!validPackageNameRegex.test(packageName)) {
    throw new Error(`Invalid package name: ${packageName}`);
  }

  try {
    const version = execSync(`pnpm view ${packageName} version`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();

    if (!version) {
      throw new Error(`Package ${packageName} not found`);
    }

    return version;
  } catch (error) {
    /**
     * 如果是我们自己抛出的错误（验证失败或包不存在），直接重新抛出
     */
    if (error instanceof Error && (error.message.includes('Invalid package name') || error.message.includes('not found'))) {
      throw error;
    }

    /**
     * 其他错误（如命令执行失败）
     */
    console.error(`[获取包版本] 错误: 无法获取 ${packageName} 的版本号`, error);
    throw new Error(`Failed to get version for package: ${packageName}`);
  }
};
