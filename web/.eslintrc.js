module.exports = {
    parserOptions: {
        sourceType: 'module'
    },
    parser: "vue-eslint-parser",
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'prettier'
    ],
    rules: {
        'vue/no-unused-vars': 'error'
    }
}