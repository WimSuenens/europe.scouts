<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->
<style lang="scss">
@use "~/assets/scss/main.scss";
</style>

<template>
  <NuxtLayout style="background: rgba(222, 222, 222, 0.8);">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  
  const { mobile } = useDisplay()
  
</script>