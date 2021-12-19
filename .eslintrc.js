module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'jest'],
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  ignorePatterns: ['dist', 'node_modules'],
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
  },
  overrides: [
    {
      files: ['*.*'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['*.vue'],
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'import/first': 'off', // https://github.com/vuejs/eslint-plugin-vue/issues/1577
      },
    },
  ],
}
