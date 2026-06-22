const expo = require('eslint-config-expo/flat');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  ...expo,
  eslintConfigPrettier,
  {
    ignores: ['node_modules/', 'android/', 'ios/', 'dist/', '.expo/'],
  },
  {
    rules: {
      // Standard data-fetch-on-mount pattern used across screens
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];
