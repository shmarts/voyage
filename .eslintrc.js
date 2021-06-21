module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'standard',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint'],
  env: {
    es6: true,
    node: true,
  },
  ignorePatterns: ['dist', 'node_modules', 'shims-vue.d.ts'],
}
