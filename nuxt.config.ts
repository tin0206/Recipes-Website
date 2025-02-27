// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  alias: {
    '@': resolve(__dirname, 'src'),
  },
  css: [
    "~/assets/main.scss",
  ], 
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/ui',
    "@nuxtjs/cloudinary",
  ],
  components: {
    dirs: [
      '~/components',
      {
        path: 'node_modules/@nuxtjs/cloudinary/dist/runtime/components',
        ignore: ['CldImage.vue'],
      }
    ]
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
      hmr: {
        overlay: false,
      },
    },
  },
})
