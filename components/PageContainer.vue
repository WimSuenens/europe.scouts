<script setup lang="ts">
import { useDisplay } from 'vuetify';
const { mobile } = useDisplay();
const sidebar = useSidebar();
</script>

<template>
  <v-main :style="!mobile? ('--v-layout-top: calc(64px + 1rem); ' + (!sidebar.mini ? '--v-layout-left: calc(256px + 1rem);' : '--v-layout-left: calc(56px + 1rem);')) : ''">
    <slot/>
  </v-main>
</template>