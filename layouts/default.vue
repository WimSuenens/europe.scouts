<template>
  <v-app :class="!mobile && false ? 'pa-2' : '' ">
    <v-locale-provider>
      <AppHeader/>
      <AppSidebar/>
      <slot />
    </v-locale-provider>
  </v-app>
</template>

<script setup>
  import { useDisplay } from 'vuetify';
  const { mobile } = useDisplay();
</script>