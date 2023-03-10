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
  plugins: ['vue'],
  rules: {
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['config']
      }
    ],
    semi: ['error', 'always'],
    'vue/multi-word-component-names': 'off'
  }
};
