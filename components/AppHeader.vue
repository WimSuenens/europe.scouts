<script setup lang="ts">
  import { useSidebar } from '~/composables/layout';
  import { useDisplay, useTheme } from 'vuetify';
  
  const sidebar = useSidebar()
  const { mobile } = useDisplay()
  const { x, y } = useWindowScroll()
  const { $client } = useNuxtApp();
  const localePath = useLocalePath()
  const { t }= useI18n();

  watch(mobile, () => mobile.value && (sidebar.value.mini = false))

  const toggleSidebar = (event: MouseEvent) => {
    (mobile.value)
      ? sidebar.value.show = !sidebar.value.show
      : sidebar.value.mini = !sidebar.value.mini
  }

  const head = useHead({title: `${t('title.welcome')} | ${t('federation')}`})

  const { status, user, person } = await $client.auth.session.mutate()
  console.log('person', person)

  const theme = useTheme()

  function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }
</script>

<template>
  <v-app-bar :elevation="2"
    floating
    :class="!mobile ? (!y ? 'rounded-pill' : 'rounded-b-xl') : 'rounded-b-xl'"
    :style="!mobile ? (!y ? 'top: 0.5rem; left: 0.5rem; width: calc(100% - 1rem);' : '') : ''"
    color="primary"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="toggleSidebar"></v-app-bar-nav-icon>
    </template>
    <NuxtLink :to="localePath('/')" style="text-decoration: none; color: inherit; height: inherit;">
      <div class="d-flex align-center" style="height: inherit;">
        <img src="/logo.svg" alt="Logo" class="pa-2" style="height: inherit;"/>
        <v-app-bar-title>{{ t('federation') }}</v-app-bar-title>
      </div>
    </NuxtLink>
    <v-spacer />
    <!-- <v-btn icon="mdi-github"
      href="https://github.com/WimSuenens/europe.scouts"
      target="_blank"
    /> -->
    <v-btn v-if="!!person" rounded elevation="0" size="x-large" class="px-2" style="text-transform: none;">
      <v-avatar color="blue" class="mr-1">
        <img src="/logo.svg" class="pa-1" style="width:inherit;" alt="User"/>
      </v-avatar>
      {{ `${person.firstname}` }}
    </v-btn>

    <NuxtLink v-if="status !== 'UNAUTHENTICATED'" :to="localePath('/auth/logout')">
      <v-btn color="white" icon="mdi-logout"/>
    </NuxtLink>

  </v-app-bar>
</template>
