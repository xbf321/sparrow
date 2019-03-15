module.exports = {
    extends: [
        'eslint-config-egg',
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    rules: {
        "indent": ["error", 4],
    },
    plugins: [
        "babel",
        'react',
    ],
    parserOptions: {
        ecmaFeatures: {
            legacyDecorators: true,
        },
        // for es6 module
        sourceType: 'module',
    },
    env: {
        node: true
    }
};