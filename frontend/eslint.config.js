import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

const appArchitecturalError = [
  '\n',
  'App architecture',
  '\n',
  'Service ➞ Controller ➞ View',
  '\n',
  'Shared 🠩',
  '\n',
].join('');

const viewArchitecturalError = [
  '\n',
  'View layer architecture',
  '\n',
  'Features ➞ Pages',
  '\n',
  'Shared 🠩',
  '\n',
].join('');

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    ignores: ['vite.config.ts'],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        alias: {
          map: [
            ['#service', './src/service'],
            ['#controller', './src/controller'],
            ['#view', './src/view'],
            ['#shared', './src/shared'],
          ],
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      },
    },
    rules: {
      // Общие правила ESLint
      'no-duplicate-imports': 'error',
      'no-console': 'off',
      'no-debugger': 'error',
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
      'consistent-return': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          caughtErrors: 'none',
          varsIgnorePattern: '^_',
        },
      ],

      // Правила React
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'warn',
      'react/no-unused-prop-types': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Порядок импортов
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-absolute-path': 'error',
      'import/no-cycle': 'error',
      'import/no-relative-parent-imports': 'off',

      // Архитектура импортов
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/view',
              from: ['./src/service'],
              message: appArchitecturalError,
            },
            {
              target: './src/controller',
              from: ['./src/view'],
              message: appArchitecturalError,
            },
            {
              target: './src/service',
              from: ['./src/controller', './src/view'],
              message: appArchitecturalError,
            },
            {
              target: './src/shared',
              from: ['./src/service', './src/controller', './src/view'],
              message: appArchitecturalError,
            },

            {
              target: './src/view/features',
              from: ['./src/view/pages'],
              message: viewArchitecturalError,
            },
            {
              target: './src/view/shared',
              from: ['./src/view/pages', './src/view/features'],
              message: viewArchitecturalError,
            },
          ],
        },
      ],
    },
  },
);
