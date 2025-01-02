import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default tseslint.config(
  { ignores: ['dist', 'vite.config.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: eslintPluginPrettier,
      '@stylistic/ts': stylisticTs

    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          printWidth: 120,
          jsxSingleQuote: true,
        },
      ],
      'no-useless-catch': 0,
      'no-console': 1,
      'no-lonely-if': 1,
      'no-unused-vars': 1,
      'no-unexpected-multiline': 1,
      '@stylistic/ts/space-before-blocks': [2, 'always'],
      '@stylistic/ts/object-curly-spacing': [1, 'always'],
      '@stylistic/ts/indent': ['warn', 2],
      '@stylistic/ts/keyword-spacing': 1,
      '@stylistic/ts/comma-dangle': 1,
      '@stylistic/ts/comma-spacing': 1
    },
  }
);
