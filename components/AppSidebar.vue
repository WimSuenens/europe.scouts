
<script setup>
  import { useSidebar } from '~/composables/layout';
  import { topNavigation, bottomNavigation } from './navigation';
  import { useDisplay } from 'vuetify';

  const sidebar = useSidebar()
  const topNavigationMenu = shallowRef(topNavigation)
  const bottomNavigationMenu = shallowRef(bottomNavigation)
  
  const { mobile } = useDisplay();
</script>

<template>
  <!--
    rail-width="60"
    :rail="sidebar.mini"
    expand-on-hover
    style="border-right: 1px solid rgba(var(--v-theme-borderLight), 0.8)"
  -->
  <v-navigation-drawer
    v-model="sidebar.show"
    :rail="sidebar.mini"
    expand-on-hover
    elevation="4"
    rounded
    color="primary"
    text="secondary"
    :style="!mobile ? (sidebar.show ? 'top: calc(64px + 0.5rem);' : 'top: calc(64px + 0.5rem); transform: translateX(calc(-256px - 1rem));') : ''"
    :class="sidebar.show ? 'mx-2 my-2' : 'my-2'"
    style="height: auto; border-right-width: 0;"
    mobile-breakpoint="lg"
  >
    <div class="d-flex flex-column h-100">

      <!-- <NuxtLink to="/" style="text-decoration: none; color: inherit;">
        <div class="d-flex align-center">
          <img src="/logo.svg" alt="Julia" style="padding: 0.25rem; height: 64px;"/>
          <v-app-bar-title>Europascouts</v-app-bar-title>
        </div>
      </NuxtLink> -->
  
      <v-list>
        <v-list-item v-for="(item , i) in topNavigationMenu" :key="i"
          :to="item.to"
          rounded="0"
          class="mb-1"
          :disabled="item.disabled"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" />
          </template>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-spacer />
  
      <v-list>
        <v-list-item v-for="(item , i) in bottomNavigationMenu" :key="i"
          :to="item.to"
          rounded="0"
          class="mb-1"
          :disabled="item.disabled"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" />
          </template>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>

  </v-navigation-drawer>
</template>