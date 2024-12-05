<script setup lang="ts">
import { useDisplay } from 'vuetify';
defineProps<{
  title?: string
}>()
const { mobile, mdAndUp, smAndDown } = useDisplay()
const { $client } = useNuxtApp()
const { status } = await $client.auth.session.mutate();
const { fullPath } = useRoute()
const { locales, locale, setLocale } = useI18n()

// console.info(locales, locale)
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  // return locales.value.filter(l => l.code !== locale.value)
  return locales.value.filter(l => l !== locale.value)
})

const {
  value: snackbar
} = useSnackbar()

</script>

<template>
  <v-card elevation="4" :class="'rounded-xl ' + (smAndDown ? 'py-3' : 'py-6')" style="background-image: linear-gradient(to top right, #82c8b4, #ffffff);">
    <NuxtLink v-if="status !== 'UNAUTHENTICATED' && !fullPath.includes('/auth/logout')" :to="localePath('/auth/logout')">
      <v-btn icon="mdi-logout" variant="plain" class="position-absolute top-0 right-0 ma-2" />      
    </NuxtLink>

    <!-- <v-btn v-if="status !== 'UNAUTHENTICATED'" append-icon="mdi-logout" variant="plain" class="position-absolute top-0 right-0 ma-2" /> -->
    <v-menu location="top" transition="slide-x-transition">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" append-icon="mdi-cog" variant="plain" class="position-absolute bottom-0 right-0 ma-2">
          {{ locale }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(l, index) in locales" :key="index" :value="index"
          :to="switchLocalePath(l)" :disabled="l == locale"
        >
          <!-- <NuxtLink :to="switchLocalePath(l)" :disabled="l == locale">{{ l }}</NuxtLink> -->
          <!-- <v-btn variant="plain" color="indigo" @click="switchLocalePath(l)" :disabled="l == locale">{{ l }}</v-btn> -->
          <v-list-item-title>{{ l.toUpperCase() }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-row :class="mdAndUp ? 'ma-9' : 'ma-6'">
      <v-col v-if="mdAndUp" cols="12" md="4" class="d-flex flex-column justify-center">
        <div class="text-center">
          <img src="/images/europascouts.jpg" alt="Logo" class="rounded-xl"/>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <div class="mb-6 ma-auto" style="max-width: 86rem;">
          <v-row>
            <v-col>
              <div class="d-flex align-center">
                <img src="/logo.svg" alt="Logo" class="rounded-xl" height="64"/>
                <span class="ml-6 text-h5">{{ $t('federation') }}<span v-if="!!title"> | {{ title }}</span></span>
              </div>
            </v-col>
          </v-row>
    
          <slot />

        </div>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.show">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn icon="mdi-close" variant="plain" 
          color="red-lighten-2"
          @click="snackbar.show = false"
        ></v-btn>
      </template>
    </v-snackbar>

  </v-card>

</template>