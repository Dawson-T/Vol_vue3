import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from '@vant/auto-import-resolver';
import Components from 'unplugin-vue-components/vite'
// https://vitejs.dev/config/
// 后端已有cors 无需 proxy 代理跨域
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      // eslint 配置
      eslintrc: {
        enabled: true, // 当配置 enabled: true 时，会根据 filepath 配置的路径生成一个 .eslintrc-auto-import.json 文件
        filepath: 'src/.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
      imports: ['vue', 'vue-router'], // 配置导出的文件
      resolvers: [VantResolver()],
      dts: 'src/auto-import.d.ts', // vue、vue-router ts类型导出位置
    }),
    Components({
      // 搜索子目录
      deep: true,
      // 组件有效的扩展名
      extensions: ['vue', 'js', 'jsx', 'ts', 'tsx', '.mjs'],
      include: [/\.vue$/, /\.vue\?vue/, /\.js$/, /\.jsx$/, /\.ts$/, /\.tsx$/],
      resolvers: [VantResolver({})], // 不要引入vant打包会找不到样式
      // 允许子目录作为组件的命名空间前缀。
      // directoryAsNamespace: false,
      // 指定自动导入的组件位置，默认是 src/components
      dirs: ['src/components'],
      dts: 'src/components.d.ts',
      directives: true,
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/styles/variable.scss'; `,
      },
    },
  },
  server: {
    port: 8080,
  },
  build: {
    /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
    chunkSizeWarningLimit: 2048,
    /** 禁用 gzip 压缩大小报告 */
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // node_modules 放在vendor文件下
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
  // 混淆器
  esbuild: {
    /** 打包时移除 console.log */
    pure: ['console.log'],
    /** 打包时移除 debugger */
    drop: ['debugger'],
    /** 打包时移除所有注释 */
    legalComments: 'none',
  },
})
