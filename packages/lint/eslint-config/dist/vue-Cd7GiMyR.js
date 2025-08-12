import pluginVue from "eslint-plugin-vue";
import parserVue from "vue-eslint-parser";

//#region rules/vue.ts
var vue_default = [
	{
		name: "rules/vue/base/setup",
		plugins: { vue: pluginVue },
		languageOptions: { sourceType: "module" }
	},
	{
		name: "rules/vue/base/setup-for-vue",
		plugins: { vue: pluginVue },
		files: ["*.vue", "**/*.vue"],
		languageOptions: {
			parser: parserVue,
			sourceType: "module"
		},
		rules: {
			"vue/comment-directive": "error",
			"vue/jsx-uses-vars": "error"
		},
		processor: "vue/vue"
	},
	{
		name: "rules/vue",
		rules: {
			"vue/no-shared-component-data": "error",
			"vue/require-prop-type-constructor": "error",
			"vue/require-valid-default-prop": "error",
			"vue/require-v-for-key": "error",
			"vue/no-use-v-if-with-v-for": "warn",
			"vue/no-async-in-computed-properties": "error",
			"vue/no-dupe-keys": "error",
			"vue/no-duplicate-attributes": "error",
			"vue/no-parsing-error": ["error", {
				"x-invalid-end-tag": false,
				"invalid-first-character-of-tag-name": false
			}],
			"vue/no-reserved-keys": "error",
			"vue/no-side-effects-in-computed-properties": "error",
			"vue/no-template-key": "warn",
			"vue/no-textarea-mustache": "error",
			"vue/no-unused-components": "warn",
			"vue/no-unused-vars": "warn",
			"vue/require-component-is": "warn",
			"vue/require-render-return": "error",
			"vue/return-in-computed-property": "error",
			"vue/use-v-on-exact": "error",
			"vue/valid-template-root": "error",
			"vue/valid-v-bind": "error",
			"vue/valid-v-cloak": "error",
			"vue/valid-v-else-if": "error",
			"vue/valid-v-else": "error",
			"vue/valid-v-for": "error",
			"vue/valid-v-html": "error",
			"vue/valid-v-if": "error",
			"vue/valid-v-model": "error",
			"vue/valid-v-on": "error",
			"vue/valid-v-once": "error",
			"vue/valid-v-pre": "error",
			"vue/valid-v-show": "error",
			"vue/valid-v-slot": "error",
			"vue/valid-v-text": "error"
		}
	}
];

//#endregion
export { vue_default };