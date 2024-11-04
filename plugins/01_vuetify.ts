// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const purpleTheme: ThemeDefinition = {
  dark: false,
  // colors: {
  //   background: '#FFFFFF',
  //   surface: '#FFFFFF',
  //   'surface-bright': '#FFFFFF',
  //   'surface-light': '#EEEEEE',
  //   'surface-variant': '#424242',
  //   'on-surface-variant': '#EEEEEE',
  //   primary: '#1867C0',
  //   'primary-darken-1': '#1F5592',
  //   secondary: '#48A9A6',
  //   'secondary-darken-1': '#018786',
  //   error: '#B00020',
  //   info: '#2196F3',
  //   success: '#4CAF50',
  //   warning: '#FB8C00',
  // },
  // colors: {
  //   primary: '#1e88e5',
  //   secondary: '#5e35b1',
  //   info: '#03c9d7',
  //   success: '#00c853',
  //   accent: '#FFAB91',
  //   warning: '#ffc107',
  //   error: '#f44336',
  //   lightprimary: '#eef2f6',
  //   lightsecondary: '#ede7f6',
  //   lightsuccess: '#b9f6ca',
  //   lighterror: '#f9d8d8',
  //   lightwarning: '#fff8e1',
  //   darkText: '#212121',
  //   lightText: '#616161',
  //   darkprimary: '#1565c0',
  //   darksecondary: '#4527a0',
  //   borderLight: '#d0d0d0',
  //   inputBorder: '#787878',
  //   containerBg: '#eef2f6',
  //   surface: '#fff',
  //   'on-surface-variant': '#fff',
  //   facebook: '#4267b2',
  //   twitter: '#1da1f2',
  //   linkedin: '#0e76a8',
  //   gray100: '#fafafa',
  //   primary200: '#90caf9',
  //   secondary200: '#b39ddb'
  // },
  // variables: {
  //   'border-color': '#1e88e5',
  //   'carousel-control-size': 10,
  //   // 'border-color': '#000000',
  //   'border-opacity': 0.12,
  //   'high-emphasis-opacity': 0.87,
  //   'medium-emphasis-opacity': 0.60,
  //   'disabled-opacity': 0.38,
  //   'idle-opacity': 0.04,
  //   'hover-opacity': 0.04,
  //   'focus-opacity': 0.12,
  //   'selected-opacity': 0.08,
  //   'activated-opacity': 0.12,
  //   'pressed-opacity': 0.12,
  //   'dragged-opacity': 0.08,
  //   'theme-kbd': '#212529',
  //   'theme-on-kbd': '#FFFFFF',
  //   'theme-code': '#F5F5F5',
  //   'theme-on-code': '#000000',
  // }
  variables: {
    'border-color': '#f0f0f0',
    'carousel-control-size': 10,
    gradient: 'linear-gradient(250.38deg, #e6f4ff 2.39%, #69b1ff 34.42%, #1677ff 60.95%, #0958d9 84.83%, #002c8c 104.37%)',
    gradient2: 'linear-gradient(to right, rgb(9, 89, 218), rgb(22, 119, 255))',
    'card-shadow': '0px 1px 4px rgba(0, 0, 0, 0.08)'
  },
  colors: {
    primary: '#1677ff',
    secondary: '#8c8c8c',
    info: '#13c2c2',
    success: '#52c41a',
    accent: '#FFAB91',
    warning: '#faad14',
    error: '#ff4d4f',
    lightprimary: '#e6f4ff',
    lightsecondary: '#f5f5f5',
    lightsuccess: '#EAFCD4',
    lighterror: '#FFE7D3',
    lightwarning: '#FFF6D0',
    darkText: '#212121',
    lightText: '#8c8c8c',
    darkprimary: '#0958d9',
    darksecondary: '#7a7878',
    borderLight: '#e6ebf1',
    inputBorder: '#a1a1a5',
    containerBg: '#fafafb',
    surface: '#fff',
    'on-surface-variant': '#fff',
    facebook: '#4267b2',
    twitter: '#1da1f2',
    linkedin: '#0e76a8',
    gray100: '#f5f5f5',
    primary200: '#a1d2ff',
    secondary200: '#eeeeee'
  }
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'purpleTheme',
      themes: {
        purpleTheme,
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    // theme: {
    //   defaultTheme: 'light'
    // }
  })
  app.vueApp.use(vuetify)
})
