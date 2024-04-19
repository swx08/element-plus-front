import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

export default defineConfig({
  base: "./", // 开发或生产环境服务的公共基础路径
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 路径别名
    },
  },
  server: {
    host: true, // 监听所有地址
    port: 3000,
    proxy: {
      //设置代理，必须填
      "/api": {
        //目标代理服务器地址：部署时将localhost改成自己服务器的地址即可
        target: "http://localhost:9800",
        changeOrigin: true, //是否设置同源，输入是的
        //重写路径
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    vue()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 两种方式都可以
        javascriptEnabled: true,
        additionalData: '@import "./src/style/global.scss";'
      }
    }
  }
});
