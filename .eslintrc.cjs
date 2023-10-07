module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      { additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)' },
    ],
    '@typescript-eslint/no-empty-interface': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
