// eslint.config.js
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
	{
		files: ['**/*.ts'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2021,
				Bun: 'readonly'
			},
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.json'
			}
		},
		plugins: {
			'@typescript-eslint': tsEslint
		},
		rules: {
			...tsEslint.configs['recommended'].rules,
			...tsEslint.configs['recommended-requiring-type-checking'].rules,
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'warn'
		}
	},
	{
		ignores: [
			'node_modules/',
			'dist/',
			'*.d.ts'
		]
	}
];