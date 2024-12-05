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
      title: 'Home | Scouts & Guides of Europe',
      link: [{ rel: 'icon', type: 'image/svg', href: "/logo.svg" }]
    }
  },

  runtimeConfig: {
    admin: {
      password: '' // overwrite with NUXT_ADMIN_PASSWORD
    },
    session: {
      password: '' // overwrite with NUXT_SESSION_PASSWORD
    },
    mail: {
      host: 'papercut', // overwrite with NUXT_MAIL_HOST,
      port: 25, // overwrite with NUXT_MAIL_PORT,
      secure: false, // overwrite with NUXT_MAIL_SECURE,
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

  modules: ['@vueuse/nuxt', '@nuxtjs/i18n'],
  i18n: {
    vueI18n: './i18n.config.ts', // default
    // strategy: 'prefix',
    strategy: 'prefix_and_default',
    defaultLocale: 'fr',
    locales: ['en', 'nl', 'fr'],
    // skipSettingLocaleOnNavigate: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  }
})