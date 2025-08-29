import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    '**/dist',
    '**/node_modules/',
    '**/dist/',
    '**/dist-ssr/',
    '**/coverage/',
    '**/_.config.js',
    '**/_.config.ts',
    '**/_.config.mjs',
    '**/_.config.cjs',
    '**/_-lock.json',
    '**/_-lock.yaml',
    '**/*.lock',
    '**/.env',
    '**/.env._',
    '**/.env-_',
    '**/data/core',
    '**/data/index.ts',
    '**/data/*.gen.ts',
    'src/routeTree.gen.ts',
    '.tanstack',
  ]),
  {
    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended'
      )
    ),

    plugins: {},

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
          propElementValues: 'always',
        },
      ],

      'react/prop-types': 'off',

      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      '@typescript-eslint/no-import-type-side-effects': 'warn',

      '@typescript-eslint/no-explicit-any': [
        'error',
        {
          fixToUnknown: true,
        },
      ],

      'no-console': 'error',
    },
  },
]);
