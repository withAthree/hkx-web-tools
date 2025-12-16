---
globs: *.ts
alwaysApply: false
---


# TypeScript 代码质量规范

## 1. 类型安全优先
- 始终利用 TypeScript 的类型系统，确保类型安全。
- 避免使用 `any`，优先考虑使用合适的类型、联合类型和类型别名。
- 凡遇不能静态推断类型的变量，必须显式类型注解。

## 2. 使用接口与类型别名
- 更倾向于用 `interface` 描述对象结构，用 `type` 定义联合类型或工具类型。
- 接口适用于面向对象和公开 API 场景，类型别名更适用于类型组合和高阶类型。

## 3. 函数书写规范
- 优先使用箭头函数（除非有 this 绑定需求）。
- 所有函数参数与返回值都应有明确类型定义。
- 函数参数建议使用具名参数对象，以提升可扩展性和可读性。

## 4. 避免类型断言
- 避免滥用类型断言（`as Type`），只有在类型系统无法静态推断时才可使用，并加注释说明原因。

## 5. 枚举与常量
- 尽量避免使用原生 `enum`，推荐 `const enum` 或字面量联合类型 + 对象常量方式声明。
- 全局常量统一通过 `const` 声明，并大写命名（例如：`const API_URL = ...`）。

## 6. 可选链和空值合并
- 善用可选链（`?.`）与空值合并操作符（`??`），避免常规的空值判断。

## 7. 模块化与避免循环依赖
- 按功能模块拆分代码，文件/文件夹命名简洁明了。
- 禁止循环依赖。

## 8. 接口设计
- 对外暴露类型优先考虑只暴露接口（interface/type），隐藏内部实现细节。
- 尽量使用只读（readonly）修饰符保护不可变数据。

## 9. 严格模式
- 始终开启 TypeScript 严格模式（`strict: true`）。项目中的 tsconfig.json 禁止关闭。

## 10. 工具类型优先
- 善用 TypeScript 提供的 Utility Types（如 Partial, Pick, Omit, Record 等），避免重复造轮子。

## 11. 只做类型捕获，不做运行时逻辑
- 类型文件（如 `*.d.ts` 或纯 type/interface 文件）不得包含实现逻辑。
- 类型推导逻辑保持纯粹，避免引入运行时代码。

## 12. 代码注释与文档
- 公共类型必须注明注释，说明用途和字段含义。
- 复杂类型和类型体操须给出用途与示例。

---

**示例**：

```typescript
// ✅ 推荐
type UserStatus = 'active' | 'disabled' | 'pending';

interface User {
  readonly id: string;
  name: string;
  status: UserStatus;
}

// ❌ 避免
let user: any = {};
user.status = 'foo'; // 非法
```









