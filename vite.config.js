import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default {
  resolve: {
    alias: {
      vue: '@vue/compat'
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2
          }
        }
      }
    })
  ],
  server: {
    port: 8080
  },
  base: './'
}