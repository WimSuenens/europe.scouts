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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  
  const { mobile } = useDisplay()
  
</script>