<script setup lang="ts">
import { useDisplay } from 'vuetify';
const { mdAndUp } = useDisplay()

</script>

<style scoped>
.v-application {
  min-height: 100vh;
  background-image: linear-gradient(to top right, #B2DFDB, #004D40);
}

.full-height-background {
  min-height: 100vh;
  background-image: linear-gradient(to top right, #B2DFDB, #004D40);
}
</style>

<template>
  <v-app>
    <v-locale-provider>
      <div :class="'full-height-background d-flex flex-column justify-center ' + (mdAndUp ? 'pa-16' : 'pa-3')">
        <slot />
      </div>
    </v-locale-provider>
  </v-app>
</template>