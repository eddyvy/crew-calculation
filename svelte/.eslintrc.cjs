module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2019
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		'array-bracket-spacing': [ 'error', 'always', { singleValue: true, objectsInArrays: true, arraysInArrays: true } ],
		'arrow-parens': [ 'error', 'always' ],
		'arrow-spacing': 'error',
		'comma-dangle': ['error', { objects: 'always-multiline', arrays: 'always-multiline', exports: 'always-multiline' } ],
		'comma-spacing': 'error',
		'default-case': 'off',
		'dot-location': [ 'error', 'property' ],
		'dot-notation': [ 'error', { allowKeywords: true } ],
		'eol-last': [ 'error', 'always' ],
		'grouped-accessor-pairs': [ 'error', 'getBeforeSet' ],
		'indent': [ 'error', 2, { SwitchCase: 1 } ],
		'keyword-spacing': [ 'error', { after: true, before: true } ],
		'no-constructor-return': 'error',
		'no-duplicate-imports': 'error',
		'no-unused-expressions': [ 'error', { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true } ],
		'no-restricted-properties': 'off',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': ['error', 'always', { objectsInObjects: true, arraysInObjects: true }],
		'quotes': [ 'error', 'single' ],
		'semi': [ 'error', 'never' ],
		'sort-imports': [ 'error', { ignoreDeclarationSort: true } ],
		'space-before-blocks': 'error',
		'space-infix-ops': 'error',
	}
};
