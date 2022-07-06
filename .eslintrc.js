module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],

      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-native/no-inline-styles': 0,
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.tsx'] }],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'], // disable the rule for variables, but enable it for functions and classes
        'linebreak-style': [0, 'always'],
        'comma-dangle': ['off'],
        'no-unused-vars': ['warn'],
        'object-curly-spacing': ['off'],
        'padded-blocks': ['off'],
        'no-underscore-dangle': ['error', { allowAfterThis: true }],
        'import/prefer-default-export': 0,
        'import/no-unresolved': ['off'],
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
            'no-inline-styles': false,
          },
        ],
        'react/prefer-stateless-function': ['off'],
        'react/no-unstable-nested-components': ['off', { allowAsProps: true }],
      },
    },
  ],
};
