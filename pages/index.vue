<template>
  <v-container>
    <v-btn @click="toggleTheme">toggle theme</v-btn>
  </v-container>
</template>

<script setup>
import { useTheme } from 'vuetify'

definePageMeta({
  layout: "default",
})

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>