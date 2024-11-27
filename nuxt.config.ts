// https://nuxt.com/docs/api/configuration/nuxt-config
// import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: { enabled: true },

  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '~/assets/scss/main.scss'
  ],

  app: {
    head: {
      title: 'Home | Europascouts',
      link: [{ rel: 'icon', type: 'image/svg', href: "/logo.svg" }]
    }
  },

  runtimeConfig: {
    session: {
      password: '' // overwrite with NUXT_SESSION_PASSWORD
    },
    
    mail: {
      host: '', // overwrite with NUXT_MAIL_HOST,
      user: '', // overwrite with NUXT_MAIL_USER,
      password: '', // overwrite with NUXT_MAIL_PASSWORD,
    }
  },

  vite: {
    // https://stackoverflow.com/questions/78997907/the-legacy-js-api-is-deprecated-and-will-be-removed-in-dart-sass-2-0-0
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern'
        }
      }
    },
  },

  build: {
    transpile: [
      "vuetify",
      "trpc-nuxt",
    ]
  },

  modules: ['@vueuse/nuxt'],
})