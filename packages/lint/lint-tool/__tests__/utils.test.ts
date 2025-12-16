import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { execSync } from 'child_process';
import { getEslintConfigContent, getPackageVersion } from '../src/utils';

// Mock child_process
vi.mock('child_process', () => ({
    execSync: vi.fn(),
}));

describe('utils', () => {
    describe('getEslintConfigContent', () => {
        it('应该生成基础的 JavaScript 配置', () => {
            const result = getEslintConfigContent('index', null, false);

            expect(result).toContain("import { defineConfig } from 'eslint/config'");
            expect(result).toContain("import eslintConfig from 'hkx-eslint-config'");
            expect(result).toContain('export default defineConfig([');
            expect(result).toContain('...eslintConfig');
            expect(result).not.toContain('formatter');
        });

        it('应该生成带 TypeScript 的配置', () => {
            const result = getEslintConfigContent('typescript', null, false);

            expect(result).toContain("import eslintConfig from 'hkx-eslint-config/typescript'");
        });

        it('应该生成带 Vue + TypeScript 的配置', () => {
            const result = getEslintConfigContent('typescript/vue', null, false);

            expect(result).toContain("import eslintConfig from 'hkx-eslint-config/typescript/vue'");
        });

        it('应该包含 ignores 配置', () => {
            const ignores = 'ignores: ["dist", "node_modules"]';
            const result = getEslintConfigContent('index', ignores, false);

            expect(result).toContain(ignores);
            expect(result).toMatch(/\[\s*\.\.\.eslintConfig,\s*\{\s*ignores:/);
        });

        it('应该包含 formatter 配置', () => {
            const result = getEslintConfigContent('index', null, true);

            expect(result).toContain("import formatter from 'hkx-eslint-config/formatter'");
            expect(result).toContain('...formatter');
        });

        it('应该同时包含 ignores 和 formatter', () => {
            const ignores = 'ignores: ["dist"]';
            const result = getEslintConfigContent('typescript', ignores, true);

            expect(result).toContain("import formatter from 'hkx-eslint-config/formatter'");
            expect(result).toContain(ignores);
            expect(result).toContain('...formatter');
        });
    });

    describe('getPackageVersion', () => {
        const mockExecSync = execSync as unknown as ReturnType<typeof vi.fn>;

        beforeEach(() => {
            vi.clearAllMocks();
            // 清除 console.error 的输出
            vi.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('应该成功获取包版本', async () => {
            mockExecSync.mockReturnValue('1.2.3\n');

            const version = await getPackageVersion('hkx-eslint-config');

            expect(version).toBe('1.2.3');
            expect(mockExecSync).toHaveBeenCalledWith(
                'pnpm view hkx-eslint-config version',
                expect.objectContaining({
                    encoding: 'utf-8',
                    stdio: ['pipe', 'pipe', 'pipe'],
                })
            );
        });

        it('应该处理 scoped 包名', async () => {
            mockExecSync.mockReturnValue('2.0.0\n');

            const version = await getPackageVersion('@vue/reactivity');

            expect(version).toBe('2.0.0');
            expect(mockExecSync).toHaveBeenCalledWith(
                'pnpm view @vue/reactivity version',
                expect.any(Object)
            );
        });

        it('应该去除返回值的空白字符', async () => {
            mockExecSync.mockReturnValue('  3.4.5  \n\n');

            const version = await getPackageVersion('test-package');

            expect(version).toBe('3.4.5');
        });

        it('应该拒绝无效的包名 - 包含特殊字符', async () => {
            await expect(
                getPackageVersion('invalid; rm -rf /')
            ).rejects.toThrow('Invalid package name');

            expect(mockExecSync).not.toHaveBeenCalled();
        });

        it('应该拒绝无效的包名 - 包含空格', async () => {
            await expect(
                getPackageVersion('invalid package')
            ).rejects.toThrow('Invalid package name');

            expect(mockExecSync).not.toHaveBeenCalled();
        });

        it('应该拒绝无效的包名 - 包含反引号', async () => {
            await expect(
                getPackageVersion('invalid`command`')
            ).rejects.toThrow('Invalid package name');

            expect(mockExecSync).not.toHaveBeenCalled();
        });

        it('应该拒绝无效的包名 - 包含管道符', async () => {
            await expect(
                getPackageVersion('invalid|command')
            ).rejects.toThrow('Invalid package name');

            expect(mockExecSync).not.toHaveBeenCalled();
        });

        it('应该拒绝无效的包名 - 包含 & 符号', async () => {
            await expect(
                getPackageVersion('invalid&&command')
            ).rejects.toThrow('Invalid package name');

            expect(mockExecSync).not.toHaveBeenCalled();
        });

        it('应该在版本为空时抛出错误', async () => {
            mockExecSync.mockReturnValue('');

            await expect(
                getPackageVersion('non-existent-package')
            ).rejects.toThrow('Package non-existent-package not found');
        });

        it('应该在命令执行失败时抛出错误', async () => {
            mockExecSync.mockImplementation(() => {
                throw new Error('Command failed');
            });

            await expect(
                getPackageVersion('some-package')
            ).rejects.toThrow('Failed to get version for package: some-package');

            expect(console.error).toHaveBeenCalledWith(
                expect.stringContaining('[获取包版本] 错误'),
                expect.any(Error)
            );
        });

        it('应该允许有效的包名 - 带连字符', async () => {
            mockExecSync.mockReturnValue('1.0.0\n');

            const version = await getPackageVersion('my-test-package');

            expect(version).toBe('1.0.0');
        });

        it('应该允许有效的包名 - 带下划线', async () => {
            mockExecSync.mockReturnValue('1.0.0\n');

            const version = await getPackageVersion('my_test_package');

            expect(version).toBe('1.0.0');
        });

        it('应该允许有效的包名 - 带点号', async () => {
            mockExecSync.mockReturnValue('1.0.0\n');

            const version = await getPackageVersion('my.test.package');

            expect(version).toBe('1.0.0');
        });

        it('应该允许有效的包名 - 带波浪号', async () => {
            mockExecSync.mockReturnValue('1.0.0\n');

            const version = await getPackageVersion('my~test~package');

            expect(version).toBe('1.0.0');
        });

        it('应该允许有效的 scoped 包名 - 复杂格式', async () => {
            mockExecSync.mockReturnValue('1.0.0\n');

            const version = await getPackageVersion('@org/my-package_v2.test');

            expect(version).toBe('1.0.0');
        });
    });
});

