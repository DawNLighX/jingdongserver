module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: ['eslint:recommended'],
  rules: {
    // 只开启几个最重要的规则
    'no-console': 'off',           // 允许 console.log
    'no-unused-vars': 'warn',      // 未使用变量警告
    'no-undef': 'error',           // 未定义变量报错
    'eqeqeq': ['error', 'always'], // 强制 ===
    'require-await': 'warn'        // Koa中间件推荐用 async
  }
}