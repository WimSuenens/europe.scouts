<script setup lang="ts">
definePageMeta({
  // middleware: 'auth',
})
const { $client } = useNuxtApp()
const user = await $client.auth.whoami.mutate()

</script>

<template>
  <div>
    <h1>Profile Page</h1>
    <div>
      <pre>{{ user }}</pre>
    </div>

  </div>
  
</template>