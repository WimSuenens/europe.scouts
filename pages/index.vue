<script setup lang="ts">
import { useTheme } from 'vuetify'
import { AuthStatus } from '~/types';

definePageMeta({
  layout: "default",
  // auth: {
  //   accepted: AuthStatus.AUTHENTICATED,
  //   redirect: {
  //     UNAUTHENTICATED: '/auth/login',
  //     VERIFICATION: '/auth/verification',      
  //     ONBOARDING: '/auth/onboarding',
  //   }
  // }
  // auth: false
})

// const { status, signIn, signOut, getSession } = useAuth()
const { data } = await useFetch('/api/me')
const headers = useRequestHeaders(['cookie']) as HeadersInit
const { data: token } = await useFetch('/api/token', { headers })

// const session  = await getSession()
const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

// const loggedIn = computed(() => {
//   var isAuthenticated = status.value == 'authenticated'
//   return isAuthenticated
// })

// async function handleSignIn() {
//   await signIn('github');
// }

// async function handleSignOut() {
//   await signOut();
// }


</script>

<template>
  <PageContainer>
    <div>
      <pre>data: {{ data }}</pre>
      <!-- <pre>session: {{ session }}</pre> -->
      <pre>token: {{ token }}</pre>
    </div>
    <!-- <div>{{ loggedIn }}</div> -->
    <!-- <div>
      <v-btn v-if="!loggedIn" @click="handleSignIn">Sign In</v-btn>
      <v-btn v-else @click="handleSignOut">Sign Out</v-btn>
    </div> -->
    <v-btn @click="toggleTheme">toggle theme</v-btn>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur aliquam porro fugiat praesentium soluta incidunt vitae, nemo molestias harum eum eligendi deserunt vel iusto animi iste corrupti aspernatur ratione quaerat, ab molestiae pariatur, nam dicta eius! Porro, molestias? Placeat odit facere sequi blanditiis, et dolor eius cumque atque itaque excepturi.</div>
  </PageContainer>
</template>

