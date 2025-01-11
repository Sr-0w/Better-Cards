module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_'
    }],
    'no-console': ['warn', { 
      allow: ['info', 'warn', 'error'] 
    }],
  },
  globals: {
    // Home Assistant globals
    'customElements': 'readonly',
    'document': 'readonly',
    'localStorage': 'readonly',
    'window': 'readonly',
  },
};