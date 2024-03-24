// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
    'nuxt-swiper',
    '@nuxtjs/svg-sprite'
  ],
  app: {
    head: {
      title: '安居',
      meta: [
        { name: 'description', content: '自助房屋租赁平台 房屋租赁 出租' }
      ],
      script: [
      ]
    }
  },
  css: [
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/display.css',
    '@/assets/styles/index.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/variables.scss";`,
        },
      },
    }
  },
  svgSprite: {
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/img": {
        target: "https://renting-house-qz.oss-cn-beijing.aliyuncs.com",
        changeOrigin: true,
      }
    },
  },
  loading: {
    color: 'green',
    height: '5px',
    throttle: 0
  }
})
