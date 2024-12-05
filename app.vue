<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->

<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import { createHead } from 'unhead'
  // Create a global head instance
  const head = createHead()
  
  const { mobile } = useDisplay()
  const { finalizePendingLocaleChange } = useI18n()

  const onBeforeEnter = async () => {
    await finalizePendingLocaleChange()
  }
  
</script>

<style lang="scss">
@use "~/assets/scss/main.scss";
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>

<template>
  <NuxtLayout>
    <NuxtPage
      :transition="{
        name: 'page',
        mode: 'out-in',
        onBeforeEnter
      }"
    />
  </NuxtLayout>
</template>
