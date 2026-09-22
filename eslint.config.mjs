import graphqlPlugin from '@graphql-eslint/eslint-plugin'; // eslint-disable-line import/no-unresolved
import openCollectiveConfig from 'eslint-config-opencollective/eslint-node.config.cjs';
import pluginJest from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  ...openCollectiveConfig,
  // Global ignores
  {
    ignores: ['**/node_modules/', '**/dist/', '**/coverage/', '**/.history', 'src/graphql/*.graphql'],
  },
  {
    files: ['**/*.{js,ts}'],

    // Lint GraphQL queries embedded in `gql` / `gqlV1` tags against the schemas (see graphql.config.js)
    processor: graphqlPlugin.processor,

    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },

    rules: {
      'import/no-commonjs': 'error',
      'import/no-named-as-default-member': 'off',
      'n/no-process-exit': 'off',
      'n/no-unsupported-features/node-builtins': 'off',
      'no-useless-escape': 'off',
      'prefer-rest-params': 'off',
      'require-atomic-updates': 'off',
      camelcase: 'error',
    },
  },
  // Disable some JS rules that are enforced in TS
  {
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  // Tests
  {
    files: ['test/**/*'],
    ...pluginJest.configs['flat/recommended'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...pluginJest.configs['flat/recommended'].rules,
      'jest/expect-expect': ['warn', { assertFunctionNames: ['expect', 'validate*'] }],
      'jest/prefer-to-have-length': 'warn',
      'n/no-unpublished-import': 'off',
    },
  },
  // Mocks
  {
    files: ['test/mocks/**/*'],
    rules: {
      camelcase: 'off',
    },
  },
  {
    files: ['**/*.graphql'],

    languageOptions: {
      parser: graphqlPlugin.parser,
    },
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },

    rules: {
      '@graphql-eslint/no-deprecated': 'warn',
      '@graphql-eslint/fields-on-correct-type': 'error',
      '@graphql-eslint/no-duplicate-fields': 'error',
      '@graphql-eslint/naming-convention': [
        'error',
        {
          VariableDefinition: 'camelCase',

          OperationDefinition: {
            style: 'PascalCase',
            forbiddenPrefixes: ['get', 'fetch'],
            forbiddenSuffixes: ['Query', 'Mutation', 'Fragment'],
          },
        },
      ],
    },
  },
];
