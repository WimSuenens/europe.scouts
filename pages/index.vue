<template>
  <v-container>
    <v-btn @click="toggleTheme">toggle theme</v-btn>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
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