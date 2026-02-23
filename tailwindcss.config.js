/** @type {import('tailwindcss').Config} */
module.exports = {
	// 1. 设置Tailwind工具类的前缀
   prefix: 'tw',
  // 2. 指定需要扫描的文件（用于按需编译工具类）
   content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  // 核心配置：禁用 Preflight 重置样式
	corePlugins: {
      preflight: false, // 关键：关闭默认重置样式
    },
  // 添加自定义样式
   theme: {
    extend: {},
  },
  // 添加插件
   plugins: [],
  // 开启 !important, 强制覆盖其他样式
  important: true,
}