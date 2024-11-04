<template>
  <v-app-bar :elevation="2" rounded class="rounded-lg rounded-t-0" color="primary">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="toggleSidebar"></v-app-bar-nav-icon>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    </template>
    <!-- <img src="/logo.svg" alt="Julia" style="padding: 0.25rem; height: inherit;"/> -->
    <NuxtLink to="/" style="text-decoration: none; color: inherit; height: inherit;">
      <div class="d-flex align-center" style="height: inherit;">
        <img src="/logo.svg" alt="Julia" class="pa-2" style="height: inherit;"/>
        <v-app-bar-title>Europascouts</v-app-bar-title>
      </div>
    </NuxtLink>
    <!-- <v-app-bar-title>Welkom</v-app-bar-title> -->
    <v-spacer />
    <v-btn
      icon
      class="text-secondary hidden-sm-and-down d-flex"
      color="darkText"
      rounded="sm"
      variant="text"
      href="https://github.com/WimSuenens/europe.scouts"
      target="_blank"
    >
      <v-icon icon="mdi-github" />
    </v-btn>
    <v-btn
      icon
      class="text-secondary hidden-sm-and-down d-flex"
      color="darkText"
      rounded="sm"
      variant="text"
      target="_blank"
    >
      <v-icon icon="mdi-bell" />
    </v-btn>

    <v-btn elevation="0" size="x-large" class="px-2" style="text-transform: none;">
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

  </v-app-bar>
</template>

<script setup lang="ts">
  import { useSidebar } from '~/composables/layout';
  import { useDisplay } from 'vuetify';
  
  const sidebar = useSidebar()
  const { mobile } = useDisplay()
  
  watch(mobile, () => mobile.value && (sidebar.value.mini = false))

  const toggleSidebar = (event: MouseEvent) => {
    (mobile.value)
      ? sidebar.value.show = !sidebar.value.show
      : sidebar.value.mini = !sidebar.value.mini
  }
</script>