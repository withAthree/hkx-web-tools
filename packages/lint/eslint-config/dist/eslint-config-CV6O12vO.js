import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";
import importPlugin from "eslint-plugin-import";

//#region rules/base/best-practices.ts
var best_practices_default = [{
	name: "rules/base/best-practices",
	plugins: { "@stylistic": stylistic },
	rules: {
		"accessor-pairs": "off",
		"array-callback-return": ["error", { allowImplicit: true }],
		"block-scoped-var": "error",
		"class-methods-use-this": ["off", { exceptMethods: [] }],
		complexity: ["off", 10],
		"consistent-return": "off",
		curly: ["error", "multi-line"],
		"default-case": ["warn", { commentPattern: "^no default$" }],
		"dot-notation": ["error", { allowKeywords: true }],
		eqeqeq: [
			"warn",
			"always",
			{ null: "ignore" }
		],
		"guard-for-in": "warn",
		"max-classes-per-file": "off",
		"no-alert": "warn",
		"no-caller": "error",
		"no-case-declarations": "error",
		"no-div-regex": "off",
		"no-else-return": "error",
		"no-empty-function": ["error", { allow: [
			"arrowFunctions",
			"functions",
			"methods"
		] }],
		"no-empty-pattern": "error",
		"no-eq-null": "off",
		"no-eval": "error",
		"no-extend-native": "error",
		"no-extra-bind": "error",
		"no-extra-label": "error",
		"no-fallthrough": "error",
		"no-global-assign": ["error", { exceptions: [] }],
		"no-implicit-coercion": ["off", {
			boolean: false,
			number: true,
			string: true,
			allow: []
		}],
		"no-implicit-globals": "off",
		"no-implied-eval": "error",
		"no-invalid-this": "off",
		"no-iterator": "error",
		"no-labels": ["warn", {
			allowLoop: false,
			allowSwitch: false
		}],
		"no-lone-blocks": "error",
		"no-loop-func": "error",
		"no-magic-numbers": ["off", {
			ignore: [],
			ignoreArrayIndexes: true,
			enforceConst: true,
			detectObjects: false
		}],
		"no-multi-str": "error",
		"no-new": "error",
		"no-new-func": "error",
		"no-new-wrappers": "error",
		"no-octal": "error",
		"no-octal-escape": "error",
		"no-param-reassign": ["warn", {
			props: true,
			ignorePropertyModificationsFor: [
				"acc",
				"e",
				"ctx",
				"draft",
				"req",
				"request",
				"res",
				"response",
				"$scope"
			]
		}],
		"no-proto": "error",
		"no-redeclare": "error",
		"no-restricted-properties": "off",
		"no-return-assign": ["error", "always"],
		"no-script-url": "error",
		"no-self-assign": "error",
		"no-self-compare": "error",
		"no-sequences": "error",
		"no-throw-literal": "warn",
		"no-unmodified-loop-condition": "off",
		"no-unused-expressions": ["error", {
			allowShortCircuit: true,
			allowTernary: true,
			allowTaggedTemplates: true
		}],
		"no-unused-labels": "error",
		"no-useless-call": "off",
		"no-useless-catch": "error",
		"no-useless-concat": "error",
		"no-useless-escape": "error",
		"no-useless-return": "error",
		"no-void": "error",
		"no-warning-comments": ["off", {
			terms: ["todo", "fixme"],
			location: "start"
		}],
		"no-with": "error",
		"prefer-promise-reject-errors": ["warn", { allowEmptyReject: true }],
		radix: "warn",
		"require-await": "off",
		"require-unicode-regexp": "off",
		"vars-on-top": "off",
		yoda: "warn",
		"@stylistic/dot-location": ["error", "property"],
		"@stylistic/no-floating-decimal": "error",
		"@stylistic/no-multi-spaces": ["error", { ignoreEOLComments: false }],
		"@stylistic/wrap-iife": [
			"error",
			"any",
			{ functionPrototypeMethods: false }
		]
	}
}];

//#endregion
//#region rules/base/possible-errors.ts
var possible_errors_default = [{
	name: "rules/base/possible-errors",
	plugins: { "@stylistic": stylistic },
	rules: {
		"for-direction": "error",
		"getter-return": ["error", { allowImplicit: true }],
		"no-async-promise-executor": "error",
		"no-await-in-loop": "warn",
		"no-compare-neg-zero": "error",
		"no-cond-assign": ["error", "always"],
		"no-console": "error",
		"no-constant-condition": "warn",
		"no-control-regex": "off",
		"no-debugger": "error",
		"no-dupe-args": "error",
		"no-dupe-keys": "error",
		"no-duplicate-case": "error",
		"no-empty": "error",
		"no-empty-character-class": "error",
		"no-ex-assign": "error",
		"no-extra-boolean-cast": "error",
		"no-func-assign": "error",
		"no-inner-declarations": "error",
		"no-invalid-regexp": "error",
		"no-irregular-whitespace": "error",
		"no-misleading-character-class": "error",
		"no-obj-calls": "error",
		"no-prototype-builtins": "error",
		"no-regex-spaces": "error",
		"no-sparse-arrays": "error",
		"no-template-curly-in-string": "warn",
		"no-unexpected-multiline": "error",
		"no-unreachable": "error",
		"no-unsafe-finally": "error",
		"no-unsafe-negation": "error",
		"require-atomic-updates": "warn",
		"use-isnan": "error",
		"valid-typeof": ["error", { requireStringLiterals: true }],
		"@stylistic/no-extra-parens": [
			"error",
			"all",
			{
				conditionalAssign: true,
				nestedBinaryExpressions: false,
				returnAssign: false,
				ignoreJSX: "all",
				enforceForArrowConditionals: false
			}
		],
		"@stylistic/no-extra-semi": "error"
	}
}];

//#endregion
//#region rules/base/style.ts
var style_default = [{
	name: "rules/base/style",
	plugins: { "@stylistic": stylistic },
	rules: {
		"@stylistic/array-bracket-newline": "off",
		"@stylistic/array-bracket-spacing": ["error", "never"],
		"@stylistic/array-element-newline": "off",
		"@stylistic/block-spacing": ["error", "always"],
		"@stylistic/brace-style": [
			"error",
			"1tbs",
			{ allowSingleLine: true }
		],
		"@stylistic/comma-dangle": ["error", "always-multiline"],
		"@stylistic/comma-spacing": ["error", {
			before: false,
			after: true
		}],
		"@stylistic/comma-style": ["error", "last"],
		"@stylistic/computed-property-spacing": ["error", "never"],
		"@stylistic/eol-last": ["warn", "always"],
		"@stylistic/function-call-spacing": ["error", "never"],
		"@stylistic/function-paren-newline": ["error", "consistent"],
		"@stylistic/implicit-arrow-linebreak": ["error", "beside"],
		"@stylistic/indent": [
			"error",
			2,
			{
				SwitchCase: 1,
				VariableDeclarator: 1,
				outerIIFEBody: 1,
				FunctionDeclaration: {
					parameters: 1,
					body: 1
				},
				FunctionExpression: {
					parameters: 1,
					body: 1
				},
				CallExpression: { arguments: 1 },
				ArrayExpression: 1,
				ObjectExpression: 1,
				ImportDeclaration: 1,
				flatTernaryExpressions: false,
				ignoredNodes: [
					"JSXElement",
					"JSXElement > *",
					"JSXAttribute",
					"JSXIdentifier",
					"JSXNamespacedName",
					"JSXMemberExpression",
					"JSXSpreadAttribute",
					"JSXExpressionContainer",
					"JSXOpeningElement",
					"JSXClosingElement",
					"JSXText",
					"JSXEmptyExpression",
					"JSXSpreadChild"
				],
				ignoreComments: false
			}
		],
		"@stylistic/jsx-quotes": ["error", "prefer-double"],
		"@stylistic/key-spacing": ["error", {
			beforeColon: false,
			afterColon: true
		}],
		"@stylistic/keyword-spacing": ["error", {
			before: true,
			after: true,
			overrides: {
				return: { after: true },
				throw: { after: true },
				case: { after: true }
			}
		}],
		"@stylistic/line-comment-position": ["error", {
			position: "above",
			ignorePattern: "",
			applyDefaultIgnorePatterns: true
		}],
		"@stylistic/linebreak-style": ["error", "unix"],
		"@stylistic/lines-between-class-members": [
			"error",
			"always",
			{ exceptAfterSingleLine: false }
		],
		"@stylistic/lines-around-comment": "off",
		"@stylistic/max-len": [
			"warn",
			100,
			2,
			{
				ignoreUrls: true,
				ignoreComments: false,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true
			}
		],
		"@stylistic/max-statements-per-line": ["warn", { max: 1 }],
		"@stylistic/multiline-comment-style": ["warn", "starred-block"],
		"@stylistic/multiline-ternary": ["error", "never"],
		"@stylistic/new-parens": "error",
		"@stylistic/newline-per-chained-call": ["warn", { ignoreChainWithDepth: 4 }],
		"@stylistic/no-mixed-operators": ["error", {
			groups: [
				["%", "**"],
				["%", "+"],
				["%", "-"],
				["%", "*"],
				["%", "/"],
				["**", "+"],
				["**", "-"],
				["**", "*"],
				["**", "/"],
				[
					"&",
					"|",
					"^",
					"~",
					"<<",
					">>",
					">>>"
				],
				[
					"==",
					"!=",
					"===",
					"!==",
					">",
					">=",
					"<",
					"<="
				],
				["&&", "||"],
				["in", "instanceof"]
			],
			allowSamePrecedence: false
		}],
		"@stylistic/no-mixed-spaces-and-tabs": "error",
		"@stylistic/no-multiple-empty-lines": ["error", {
			max: 2,
			maxEOF: 1
		}],
		"@stylistic/no-tabs": "error",
		"@stylistic/no-trailing-spaces": ["error", {
			skipBlankLines: false,
			ignoreComments: false
		}],
		"@stylistic/no-whitespace-before-property": "error",
		"@stylistic/nonblock-statement-body-position": [
			"error",
			"beside",
			{ overrides: {} }
		],
		"@stylistic/object-curly-newline": "off",
		"@stylistic/object-curly-spacing": ["error", "always"],
		"@stylistic/object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
		"@stylistic/one-var-declaration-per-line": ["error", "always"],
		"@stylistic/operator-linebreak": "off",
		"@stylistic/padded-blocks": ["warn", {
			blocks: "never",
			classes: "never",
			switches: "never"
		}],
		"@stylistic/padding-line-between-statements": "off",
		"@stylistic/quote-props": [
			"error",
			"as-needed",
			{
				keywords: false,
				unnecessary: true,
				numbers: false
			}
		],
		"@stylistic/quotes": [
			"error",
			"single",
			{ avoidEscape: true }
		],
		"@stylistic/semi": ["error", "always"],
		"@stylistic/semi-spacing": ["error", {
			before: false,
			after: true
		}],
		"@stylistic/semi-style": ["error", "last"],
		"@stylistic/space-before-blocks": "error",
		"@stylistic/space-before-function-paren": ["error", {
			anonymous: "always",
			named: "never",
			asyncArrow: "always"
		}],
		"@stylistic/space-in-parens": ["error", "never"],
		"@stylistic/space-infix-ops": "error",
		"@stylistic/space-unary-ops": ["error", {
			words: true,
			nonwords: false,
			overrides: {}
		}],
		"@stylistic/spaced-comment": [
			"error",
			"always",
			{
				line: {
					exceptions: ["-", "+"],
					markers: [
						"=",
						"!",
						"/"
					]
				},
				block: {
					exceptions: ["-", "+"],
					markers: ["=", "!"],
					balanced: true
				}
			}
		],
		"@stylistic/switch-colon-spacing": ["error", {
			after: true,
			before: false
		}],
		"@stylistic/template-tag-spacing": ["error", "never"],
		"@stylistic/wrap-regex": "off",
		"capitalized-comments": "off",
		camelcase: "off",
		"consistent-this": "off",
		"func-name-matching": [
			"off",
			"always",
			{ includeCommonJSModuleExports: false }
		],
		"func-names": "off",
		"func-style": "off",
		"id-denylist": "off",
		"id-length": "off",
		"id-match": "off",
		"max-depth": ["off", 4],
		"max-lines": ["off", {
			max: 1e3,
			skipBlankLines: true,
			skipComments: true
		}],
		"max-lines-per-function": ["off", {
			max: 80,
			skipBlankLines: true,
			skipComments: true,
			IIFEs: true
		}],
		"max-nested-callbacks": "off",
		"max-params": ["off", 3],
		"max-statements": ["off", 10],
		"new-cap": ["error", {
			newIsCap: true,
			newIsCapExceptions: [],
			capIsNew: false,
			capIsNewExceptions: [
				"Immutable.Map",
				"Immutable.Set",
				"Immutable.List"
			]
		}],
		"no-array-constructor": "error",
		"no-bitwise": "warn",
		"no-continue": "off",
		"no-inline-comments": "off",
		"no-lonely-if": "error",
		"no-multi-assign": "error",
		"no-negated-condition": "off",
		"no-nested-ternary": "error",
		"no-object-constructor": "error",
		"no-plusplus": ["off", { allowForLoopAfterthoughts: true }],
		"no-restricted-syntax": "off",
		"no-ternary": "off",
		"no-underscore-dangle": "warn",
		"no-unneeded-ternary": ["error", { defaultAssignment: false }],
		"one-var": ["error", "never"],
		"operator-assignment": ["warn", "always"],
		"prefer-object-spread": "off",
		"sort-keys": [
			"off",
			"asc",
			{
				caseSensitive: false,
				natural: true
			}
		],
		"sort-vars": "off",
		"unicode-bom": ["off", "never"]
	}
}];

//#endregion
//#region rules/base/variables.ts
var variables_default = [{
	name: "rules/base/variables",
	languageOptions: { globals: {
		...globals.browser,
		...globals.es2015,
		...globals.jasmine,
		...globals.jest,
		...globals.jquery,
		...globals.mocha,
		...globals.node
	} },
	rules: {
		"init-declarations": "off",
		"no-delete-var": "error",
		"no-label-var": "error",
		"no-restricted-globals": "off",
		"no-shadow": "error",
		"no-shadow-restricted-names": "error",
		"no-undef": "error",
		"no-undef-init": "error",
		"no-undefined": "off",
		"no-unused-vars": ["error", {
			vars: "all",
			args: "after-used",
			ignoreRestSiblings: true
		}],
		"no-use-before-define": ["error", {
			functions: false,
			classes: false,
			variables: false
		}]
	}
}];

//#endregion
//#region rules/base/es6.ts
var es6_default = [{
	name: "rules/base/es6",
	plugins: { "@stylistic": stylistic },
	rules: {
		"arrow-body-style": [
			"error",
			"as-needed",
			{ requireReturnForObjectLiteral: false }
		],
		"constructor-super": "error",
		"no-class-assign": "error",
		"no-const-assign": "error",
		"no-dupe-class-members": "error",
		"no-duplicate-imports": "error",
		"no-new-native-nonconstructor": "error",
		"no-restricted-imports": ["off", {
			paths: [],
			patterns: []
		}],
		"no-this-before-super": "error",
		"no-useless-computed-key": "error",
		"no-useless-constructor": "error",
		"no-useless-rename": ["error", {
			ignoreDestructuring: false,
			ignoreImport: false,
			ignoreExport: false
		}],
		"no-var": "error",
		"object-shorthand": [
			"error",
			"always",
			{
				ignoreConstructors: false,
				avoidQuotes: true
			}
		],
		"prefer-arrow-callback": ["error", {
			allowNamedFunctions: false,
			allowUnboundThis: true
		}],
		"prefer-const": ["error", {
			destructuring: "any",
			ignoreReadBeforeAssign: true
		}],
		"prefer-destructuring": [
			"warn",
			{
				VariableDeclarator: {
					array: false,
					object: true
				},
				AssignmentExpression: {
					array: false,
					object: false
				}
			},
			{ enforceForRenamedProperties: false }
		],
		"prefer-numeric-literals": "off",
		"prefer-rest-params": "warn",
		"prefer-spread": "warn",
		"prefer-template": "warn",
		"require-yield": "error",
		"sort-imports": ["off", {
			ignoreCase: false,
			ignoreDeclarationSort: false,
			ignoreMemberSort: false,
			memberSyntaxSortOrder: [
				"none",
				"all",
				"multiple",
				"single"
			],
			allowSeparatedGroups: false
		}],
		"symbol-description": "warn",
		"@stylistic/arrow-parens": ["warn", "always"],
		"@stylistic/arrow-spacing": ["error", {
			before: true,
			after: true
		}],
		"@stylistic/generator-star-spacing": ["error", {
			before: false,
			after: true
		}],
		"@stylistic/no-confusing-arrow": "error",
		"@stylistic/rest-spread-spacing": ["error", "never"],
		"@stylistic/template-curly-spacing": "warn",
		"@stylistic/yield-star-spacing": ["error", "after"]
	}
}];

//#endregion
//#region rules/base/strict.ts
var strict_default = [{
	name: "rules/base/strict",
	rules: { strict: "off" }
}];

//#endregion
//#region rules/import.ts
var import_default = [{
	name: "rules/import",
	plugins: { import: importPlugin },
	settings: { "import/ignore": ["node_modules", "\\.(coffee|scss|css|less|hbs|svg|json)$"] },
	rules: {
		"import/no-unresolved": "error",
		"import/named": "error",
		"import/default": "error",
		"import/namespace": "error",
		"import/export": "error",
		"import/no-named-as-default": "error",
		"import/no-named-as-default-member": "warn",
		"import/no-deprecated": "off",
		"import/no-extraneous-dependencies": "off",
		"import/no-mutable-exports": "off",
		"import/unambiguous": "off",
		"import/no-commonjs": "off",
		"import/no-amd": "warn",
		"import/no-nodejs-modules": "off",
		"import/first": "error",
		"import/no-duplicates": "error",
		"import/no-namespace": "off",
		"import/extensions": "off",
		"import/order": ["off", {
			groups: [
				"builtin",
				"external",
				"internal",
				"parent",
				"sibling",
				"index"
			],
			"newlines-between": "never"
		}],
		"import/newline-after-import": "warn",
		"import/prefer-default-export": "off",
		"import/no-restricted-paths": "off",
		"import/max-dependencies": ["off", { max: 10 }],
		"import/no-absolute-path": "off",
		"import/no-dynamic-require": "off",
		"import/no-internal-modules": ["off", { allow: [] }],
		"import/no-webpack-loader-syntax": "off",
		"import/no-unassigned-import": "off",
		"import/no-named-default": "error",
		"import/no-anonymous-default-export": ["off", {
			allowArray: false,
			allowArrowFunction: false,
			allowAnonymousClass: false,
			allowAnonymousFunction: false,
			allowLiteral: false,
			allowObject: false
		}],
		"import/exports-last": "off",
		"import/group-exports": "off",
		"import/no-default-export": "off",
		"import/no-self-import": "error",
		"import/no-cycle": ["error", { maxDepth: Infinity }],
		"import/no-useless-path-segments": "off",
		"import/dynamic-import-chunkname": ["off", {
			importFunctions: [],
			webpackChunknameFormat: "[0-9a-zA-Z-_/.]+"
		}],
		"import/no-relative-parent-imports": "off"
	}
}];

//#endregion
//#region index.ts
var eslint_config_default = [
	...best_practices_default,
	...possible_errors_default,
	...style_default,
	...variables_default,
	...es6_default,
	...strict_default,
	...import_default,
	{
		name: "eslint-config/index",
		files: ["*.{js,jsx}", "**/*.{jsx}"],
		languageOptions: { parserOptions: { ecmaFeatures: {
			globalReturn: false,
			impliedStrict: true,
			jsx: true
		} } }
	}
];

//#endregion
export { eslint_config_default };