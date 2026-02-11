import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import formatjs from 'eslint-plugin-formatjs';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { includeIgnoreFile, fixupPluginRules } from '@eslint/compat';
import pluginJest from 'eslint-plugin-jest';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  { ignores: ['node_modules', 'dist', 'coverage', '.nyc_output', '**/*.graphql'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  tseslint.configs.recommended,
  {
    plugins: {
      react: fixupPluginRules(pluginReact),
    },
    rules: pluginReact.configs.flat.recommended.rules,
    languageOptions: pluginReact.configs.flat.recommended.languageOptions,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      formatjs: fixupPluginRules(formatjs),
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/prop-types': 'off',
      'formatjs/enforce-id': [
        'error',
        {
          idInterpolationPattern: '[sha512:contenthash:base64:6]',
        },
      ],
    },
  },
  // Test files
  {
    // update this to match your test files
    files: ['**/*.spec.js', '**/*.test.{js,ts}'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      'no-restricted-properties': [
        'error',
        {
          object: 'test',
          property: 'only',
          message: 'test.only should only be used for debugging purposes and is not allowed in production code',
        },
        {
          object: 'describe',
          property: 'only',
          message: 'describe.only should only be used for debugging purposes and is not allowed in production code',
        },
      ],
    },
  },
]);
