module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential",
        'plugin:nuxt/recommended',
        'prettier',
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
        "vue/multi-word-component-names": 0,
        "no-var": "error", //要求使用let或const而不是var
        "max-len": ["error", { "code": 140 }], //单行最大长度
        "no-multi-spaces": "error", // 禁止表达式多个空格
        "semi": ["error", "never"], // 禁止分号
        "arrow-parens": ["error", "as-needed"], //箭头函数省略括号
        "no-trailing-spaces": ["error", { "skipBlankLines": true }], //禁止末尾多余空格
        "key-spacing": ["error", { "afterColon": true }], //字面量对象冒号后空格
        "object-curly-spacing": ["error", "always"], //字面量对象格式化一致的空格
        "comma-spacing": ["error", { "before": false, "after": true }],
        "@typescript-eslint/no-explicit-any": ["off"]
    }
}
