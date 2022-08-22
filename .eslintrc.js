module.exports = {
  plugins: ['no-only-tests'],
  parserOptions: {
    // corresponds to 'esnext' in tsconfig
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    jest: true,
  },
  rules: {
    // This rule will fail when importing named objects from react-native.
    'import/namespace': 'off',
    // these two no-use-before-define fix an issue where eslint will throw a
    // warning like "'React' was used before it was defined" in JS files.
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        // functions are hoisted, can be used before they're defined
        functions: false,
        classes: true,
        variables: true,
      },
    ],
    'import/order': [
      'warn',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '~/**',
            group: 'internal',
            position: 'before',
          },
        ],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'no-only-tests/no-only-tests': 'error',
  },
  settings: {
    // Open RN issue, see: https://github.com/facebook/react-native/issues/28549#issuecomment-657249702
    'import/ignore': ['node_modules/react-native/index\\.js$'],
    // This and `import/resolver` are only here to make the path aliases work (e.g. @/).
    // c.f. eslint-import-resolver-typescript
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      extends: ['plugin:echobind/react-native'],
      rules: {
        'import/no-named-as-default': 0,
        'no-shadow': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
      },
    },
    {
      files: ['**/*.js'],
      parser: '@babel/eslint-parser',
      extends: [
        '@react-native-community', // from react-native init
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
      ],
    },
    {
      // it's tedious to add return types to JSX functions, so we're turning
      // that rule off for .tsx files.
      files: ['src/**/*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
};
