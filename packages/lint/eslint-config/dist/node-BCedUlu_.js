import node from "eslint-plugin-n";

//#region rules/node.ts
var node_default = [{
	name: "rules/node",
	plugins: { node },
	languageOptions: { ecmaVersion: "latest" },
	rules: {
		"node/no-new-require": "error",
		"node/prefer-global/buffer": ["error", "always"],
		"node/prefer-global/console": ["error", "always"],
		"node/prefer-global/process": ["error", "always"],
		"node/prefer-global/text-decoder": "off",
		"node/prefer-global/text-encoder": "off",
		"node/prefer-global/url-search-params": "off",
		"node/prefer-global/url": "off",
		"node/prefer-promises/dns": "warn",
		"node/prefer-promises/fs": "warn",
		"node/no-unpublished-import": "off",
		"node/no-unsupported-features/es-builtins": "off",
		"node/shebang": "off",
		"node/no-unsupported-features/es-syntax": "off",
		"node/no-unsupported-features/node-builtins": "off",
		"node/process-exit-as-throw": "off",
		"node/no-deprecated-api": "off",
		"node/handle-callback-err": "off",
		"node/no-callback-literal": "off",
		"node/no-exports-assign": "off",
		"node/no-extraneous-import": "off",
		"node/no-extraneous-require": "off",
		"node/no-missing-import": "off",
		"node/no-missing-require": "off",
		"node/no-path-concat": "off",
		"node/no-process-exit": "off",
		"node/no-unpublished-bin": "off",
		"node/no-unpublished-require": "off",
		"node/callback-return": "off",
		"node/file-extension-in-import": "off",
		"node/global-require": "off",
		"node/no-mixed-requires": "off",
		"node/no-process-env": "off",
		"node/no-restricted-import": "off",
		"node/no-restricted-require": "off",
		"node/no-sync": "off",
		"node/exports-style": "off"
	}
}];

//#endregion
export { node_default };