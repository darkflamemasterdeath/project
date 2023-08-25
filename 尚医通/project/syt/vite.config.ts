import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
//引入node提供内置模块path可以获取绝对路径
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  //配置代理跨域
  server: {
    proxy: {
      //https://mock.apifox.cn/m1/3160027-0-default/api/hosp/hospital/1/1
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://syt.atguigu.cn',
        // target: 'https://mock.apifox.cn/m1/3160027-0-default',
        changeOrigin: true,
      },
    },
  }
})
