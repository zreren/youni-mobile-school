module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  extends: [
    // airbnb规范
    // typescript的eslint插件
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // 支持jest
    // 使用prettier格式化代码
    // 'prettier',
    // 整合typescript-eslint与prettier
    // 'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'complexity': ['warning', 10],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-call':'off',
    '@typescript-eslint/no-unsafe-assignment':'off',
    '@typescript-eslint/no-unsafe-argument' : 'off',
    '@typescript-eslint/no-unsafe-member-access' :'off',
    '@typescript-eslint/restrict-template-expressions' : 'off'
  },
};
