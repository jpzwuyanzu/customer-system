import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import electronRender from 'vite-plugin-electron-renderer'
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    {
      name: 'alias',
      configureResolvedOptions(resolvedOptions) {
        resolvedOptions.alias['@'] = path.resolve(__dirname, 'src');
        return resolvedOptions;
      },
    },
    electron({
      // 入口文件
      entry: [
        // 主进程
        'electron/index.ts',
        // 预加载
        'electron/preload.ts'
      ]
    }),
    electronRender()
  ],
})
