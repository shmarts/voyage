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
}
