module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'no-console': 'off',
        'consistent-return': 'off',
        'array-callback-return': 'off',
        'no-undef': 'off',
        'no-bitwise': 'off',
        indent: 'off',
        '@typescript-eslint/indent': [
            'error',
            4,
        ],
        eqeqeq: 'off',
        'max-len': 'off',
        'no-underscore-dangle': 'off',
        'no-plusplus': 'off',
        radix: 'off',
        index: 'off',
        'prefer-destructuring': 'off',
        'no-param-reassign': 'off',
        'no-await-in-loop': 'off',
        'linebreak-style': 'off',
        camelcase: 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'off',
    },
};
