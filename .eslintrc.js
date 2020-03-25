module.exports = {
  env: {
    'browser': true,
    'es6': true,
  },
  parser: 'babel-eslint',
  plugins: [
    'jsdoc'
  ],
  extends: [
    'eslint:recommended',
    'google',
    'plugin:jsdoc/recommended'
  ],
  globals: {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  parserOptions: {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  rules: {
    'max-len': ['error', {
      'code':120,
      'tabWidth':2,
    }]
  },
};
