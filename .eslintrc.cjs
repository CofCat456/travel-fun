module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'airbnb-base',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue']
      }
    },
    'import/core-modules': ['vite', '@vitejs/plugin-vue']
  },
  plugins: ['vue', 'simple-import-sort'],
  rules: {
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['config']
      }
    ],
    semi: ['error', 'always'],
    camelcase: ['off'],
    'vue/multi-word-component-names': 'off',
    'import/prefer-default-export': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'warn'
  }
};
