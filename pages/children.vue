<template>
  <v-container>
    My Kids
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
})
const { $client, $hello } = useNuxtApp();

const tet = $hello("world");

const test = $client.hello.query({ text: 'Wim' })

</script>