import tseslint from "typescript-eslint";

//#region rules/typescript.ts
var typescript_default = [
	{
		name: "rules/typescript/base",
		languageOptions: {
			parser: tseslint.parser,
			sourceType: "module"
		},
		plugins: { "@typescript-eslint": tseslint.plugin }
	},
	{
		files: [
			"**/*.ts",
			"**/*.tsx",
			"**/*.mts",
			"**/*.cts"
		],
		name: "typescript-eslint/eslint-recommended",
		rules: {
			"no-undef": "off",
			"import/no-unresolved": "off"
		}
	},
	{
		name: "rules/typescript/aware",
		files: [
			"**/*.ts",
			"**/*.tsx",
			"**/*.mts",
			"**/*.cts"
		],
		languageOptions: { parserOptions: {
			ecmaFeatures: { jsx: true },
			projectService: true
		} },
		rules: {
			"@typescript-eslint/restrict-plus-operands": "warn",
			"dot-notation": "off",
			"@typescript-eslint/dot-notation": ["error", { allowKeywords: true }]
		}
	},
	{
		name: "rules/typescript",
		rules: {
			"@typescript-eslint/adjacent-overload-signatures": "error",
			"@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
			"@typescript-eslint/await-thenable": "off",
			"@typescript-eslint/ban-ts-comment": ["warn", {
				"ts-expect-error": "allow-with-description",
				"ts-ignore": "allow-with-description",
				"ts-nocheck": "allow-with-description",
				"ts-check": "allow-with-description"
			}],
			"@typescript-eslint/ban-tslint-comment": "error",
			"@typescript-eslint/no-empty-object-type": ["warn", { allowInterfaces: "never" }],
			"@typescript-eslint/no-unsafe-function-type": "off",
			"@typescript-eslint/no-wrapper-object-types": "off",
			"@typescript-eslint/class-literal-property-style": ["warn", "fields"],
			"@typescript-eslint/consistent-type-assertions": ["error", {
				assertionStyle: "as",
				objectLiteralTypeAssertions: "never"
			}],
			"@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
			"default-param-last": "off",
			"@typescript-eslint/default-param-last": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-member-accessibility": ["warn", { accessibility: "no-public" }],
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"init-declarations": "off",
			"@typescript-eslint/init-declarations": "off",
			"@typescript-eslint/member-ordering": ["warn", { default: [
				"public-static-field",
				"protected-static-field",
				"private-static-field",
				"static-field",
				"public-static-method",
				"protected-static-method",
				"private-static-method",
				"static-method",
				"public-instance-field",
				"protected-instance-field",
				"private-instance-field",
				"public-field",
				"protected-field",
				"private-field",
				"instance-field",
				"field",
				"constructor",
				"public-instance-method",
				"protected-instance-method",
				"private-instance-method",
				"public-method",
				"protected-method",
				"private-method",
				"instance-method",
				"method"
			] }],
			"@typescript-eslint/method-signature-style": ["warn", "property"],
			"@typescript-eslint/naming-convention": "off",
			"no-array-constructor": "off",
			"@typescript-eslint/no-array-constructor": "error",
			"@typescript-eslint/no-base-to-string": "off",
			"@typescript-eslint/no-confusing-non-null-assertion": "warn",
			"@typescript-eslint/no-dynamic-delete": "off",
			"no-empty-function": "off",
			"@typescript-eslint/no-empty-function": ["error", { allow: [
				"arrowFunctions",
				"functions",
				"methods"
			] }],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-extra-non-null-assertion": "off",
			"@typescript-eslint/no-extraneous-class": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/no-for-in-array": "off",
			"@typescript-eslint/no-implied-eval": "off",
			"@typescript-eslint/no-inferrable-types": "warn",
			"@typescript-eslint/no-invalid-void-type": "error",
			"no-magic-numbers": "off",
			"@typescript-eslint/no-magic-numbers": "off",
			"@typescript-eslint/no-misused-new": "off",
			"@typescript-eslint/no-misused-promises": "off",
			"@typescript-eslint/no-namespace": ["error", {
				allowDeclarations: true,
				allowDefinitionFiles: true
			}],
			"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/parameter-properties": "off",
			"@typescript-eslint/no-require-imports": "warn",
			"no-shadow": "off",
			"@typescript-eslint/no-shadow": "error",
			"@typescript-eslint/no-this-alias": ["warn", { allowDestructuring: true }],
			"@typescript-eslint/only-throw-error": "off",
			"@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
			"@typescript-eslint/no-unnecessary-condition": "off",
			"@typescript-eslint/no-unnecessary-qualifier": "off",
			"@typescript-eslint/no-unnecessary-type-arguments": "off",
			"@typescript-eslint/no-unnecessary-type-assertion": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"no-unused-expressions": "off",
			"@typescript-eslint/no-unused-expressions": ["error", {
				allowShortCircuit: true,
				allowTernary: true,
				allowTaggedTemplates: true
			}],
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": ["error", {
				vars: "all",
				args: "after-used",
				ignoreRestSiblings: true
			}],
			"no-use-before-define": "off",
			"@typescript-eslint/no-use-before-define": ["error", {
				functions: false,
				classes: false,
				variables: false
			}],
			"no-useless-constructor": "off",
			"@typescript-eslint/no-useless-constructor": "error",
			"@typescript-eslint/prefer-as-const": "warn",
			"@typescript-eslint/prefer-for-of": "off",
			"@typescript-eslint/prefer-function-type": "off",
			"@typescript-eslint/prefer-includes": "off",
			"@typescript-eslint/prefer-namespace-keyword": "error",
			"@typescript-eslint/prefer-nullish-coalescing": "off",
			"@typescript-eslint/prefer-optional-chain": "off",
			"@typescript-eslint/prefer-readonly": "off",
			"@typescript-eslint/prefer-readonly-parameter-types": "off",
			"@typescript-eslint/prefer-reduce-type-parameter": "off",
			"@typescript-eslint/prefer-regexp-exec": "off",
			"@typescript-eslint/prefer-string-starts-ends-with": "off",
			"@typescript-eslint/promise-function-async": "off",
			"require-await": "off",
			"@typescript-eslint/require-await": "off",
			"@typescript-eslint/restrict-template-expressions": "off",
			"@typescript-eslint/return-await": "off",
			"@typescript-eslint/strict-boolean-expressions": "off",
			"@typescript-eslint/switch-exhaustiveness-check": "off",
			"@typescript-eslint/triple-slash-reference": ["error", {
				path: "never",
				types: "always",
				lib: "always"
			}],
			"@typescript-eslint/unbound-method": "off",
			"@typescript-eslint/unified-signatures": "warn"
		}
	}
];

//#endregion
export { typescript_default };