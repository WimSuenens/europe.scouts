<script setup lang="ts">
  import { useSidebar } from '~/composables/layout';
  import { useDisplay } from 'vuetify';
  
  const sidebar = useSidebar()
  const { mobile } = useDisplay()

  const { x, y } = useWindowScroll()
  
  const { $client } = useNuxtApp();
  watch(mobile, () => mobile.value && (sidebar.value.mini = false))

  // watch(x, () => console.log('x', x))
  // watch(y, () => console.log('y', y))

  const toggleSidebar = (event: MouseEvent) => {
    (mobile.value)
      ? sidebar.value.show = !sidebar.value.show
      : sidebar.value.mini = !sidebar.value.mini
  }

  // import { useColorMode } from '@vueuse/core'

  // const mode = useColorMode() // Ref<'dark' | 'light'>

  // https://github.com/vueuse/vueuse/blob/main/packages/core/useColorMode/demo.vue
  // const mode = useColorMode({
  //   attribute: 'theme',
  //   emitAuto: true,
  //   modes: {
  //     // custom colors
  //     dim: 'dim',
  //     cafe: 'cafe',
  //   },
  // })
  // import { useColorMode } from '@vueuse/core'
  async function logout($event: PointerEvent) {
    console.log('logout')
    await $client.auth.logout.mutate()
    console.log('logged out')
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
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    </template>
    <!-- <img src="/logo.svg" alt="Julia" style="padding: 0.25rem; height: inherit;"/> -->
    <NuxtLink to="/" style="text-decoration: none; color: inherit; height: inherit;">
      <div class="d-flex align-center" style="height: inherit;">
        <img src="/logo.svg" alt="Logo" class="pa-2" style="height: inherit;"/>
        <v-app-bar-title>Europascouts</v-app-bar-title>
      </div>
    </NuxtLink>
    <!-- <v-app-bar-title>Welkom</v-app-bar-title> -->
    <v-spacer />
    <v-btn
      icon="mdi-github"
      href="https://github.com/WimSuenens/europe.scouts"
      target="_blank"
    >
    </v-btn>
    <v-btn
      icon="mdi-bell"
      target="_blank"
    >
    </v-btn>

    <!-- <button @click="mode = mode === 'dark' ? 'light' : 'dark'">
      Mode {{ mode }}
    </button> -->

    <v-btn rounded elevation="0" size="x-large" class="px-2" style="text-transform: none;">
      <v-avatar color="blue" class="mr-1">
        <img src="/logo.svg" class="pa-1" style="width:inherit;" alt="User"/>
      </v-avatar>
      John Doe
    </v-btn>

    <!-- <v-menu :close-on-content-click="false" offset="8, 0">
      <template v-slot:activator="{ props }">
        <v-btn class="profileBtn" variant="text" rounded="sm" v-bind="props">
          <div class="d-flex align-center">
            <v-avatar class="mr-sm-2 mr-0 py-2" color="primary">
              <span class="text-h5">WS</span>
            </v-avatar>
            <h6 class="text-subtitle-1 mb-0 d-sm-block d-none">JWT User</h6>
          </div>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="290">
      </v-sheet>
    </v-menu> -->

    <v-btn @click="logout($event)">Logout</v-btn>
    <v-btn icon="mdi-cog"/>

  </v-app-bar>
</template>
