module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript",
        "@vue/eslint-config-prettier"
    ],
    rules: {
        curly: ["error", "multi-line", "consistent"]
    },
};
