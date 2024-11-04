// https://nuxt.com/docs/api/configuration/nuxt-config
// import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: { enabled: true },
  build: {
    transpile: [
      "vuetify",
      "trpc-nuxt",
    ]
  },
  typescript: {
    strict: true,
    shim: false
  },
  nitro: {
    serveStatic: true
  },
  modules: [
    // "@prisma/nuxt",
    // '@pinia/nuxt',
    // (_options, nuxt) => {
    //   nuxt.hooks.hook('vite:extendConfig', (config) => {
    //     // @ts-expect-error
    //     config.plugins.push(vuetify({ autoImport: true }))
    //   })
    // },
    //...
  ],
  vite: {
    // https://stackoverflow.com/questions/78997907/the-legacy-js-api-is-deprecated-and-will-be-removed-in-dart-sass-2-0-0
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern'
        }
      }
    },
    // vue: {
    //   template: {
    //     transformAssetUrls,
    //   },
    // },
  },
  app: {
    head: {
      title: 'Home | Europascouts',
      link: [{ rel: 'icon', type: 'image/svg', href: "/logo.svg" }]
    }
  },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '~/assets/scss/main.scss'
  ],
})
