// @see: http://eslint.cn

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  /* 指定如何解析语法 */
  parser: "@typescript-eslint/parser",
  /* 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  /* 继承某些已有的规则 */
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    "no-var": "error", // 要求使用 let 或 const 而不是 var
    "no-multiple-empty-lines": ["error", { max: 1 }], // 不允许多个空行
    "no-use-before-define": "off", // 禁止在 函数/类/变量 定义之前使用它们
    "prefer-const": "off", // 此规则旨在标记使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const

    // typeScript (https://typescript-eslint.io/rules)
    "@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
    "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
    "@typescript-eslint/ban-ts-comment": "error", // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
    "@typescript-eslint/no-inferrable-types": "off", // 可以轻松推断的显式类型可能会增加不必要的冗长
    "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
    "@typescript-eslint/ban-types": "off", // 禁止使用特定类型
    "@typescript-eslint/no-var-requires": "off", // 不允许在 import 语句中使用 require 语句
    "@typescript-eslint/no-empty-function": "off", // 禁止空函数
    "@typescript-eslint/no-non-null-assertion": "off", // 不允许使用后缀运算符的非空断言(!)

    // react (https://github.com/jsx-eslint/eslint-plugin-react)
    "react-hooks/rules-of-hooks": "error", // 确保 Hooks 仅在组件或自定义 Hook 的顶层调用
    "react-hooks/exhaustive-deps": "off" // useEffect 和 useCallback Hooks 的依赖项不必详尽列出
  }
};
