import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svgBuilder } from './src/plugins/svgBuilder.js'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgBuilder('./src/icons/svg/'), // 这里已经将src/icons/svg/下的svg全部导入，无需再单独导入
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
         // 目标地址
        target: 'http://82.157.232.71:5015',
        // 发送请求头中host会设置成target
        changeOrigin: true,
        // 重写请求地址
        rewrite: (path) => path.replace(/^\/api/, '/')
      },
      '/url': {
        target: 'http://82.157.232.71:5015',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/url/, '/')
      }
    }
  }
})
