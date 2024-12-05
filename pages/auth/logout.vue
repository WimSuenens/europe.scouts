<script setup lang="ts">
import { AuthStatus } from '~/types';

const { t } = useI18n()
const localePath = useLocalePath()
const { $client } = useNuxtApp()

definePageMeta({
  layout: "landing",
  auth: {
    accepted: [
      AuthStatus.VERIFICATION,
      AuthStatus.ONBOARDING,
      AuthStatus.AUTHENTICATED
    ]
  }
  // auth: {
  //   accepted: AuthStatus.UNAUTHENTICATED,
  //   redirect: {
  //     VERIFICATION: '/auth/verification',
  //     ONBOARDING: '/auth/onboarding',
  //     AUTHENTICATED: '/'
  //   }
  // },
})

useHead({ title: `${t('title.logout')} | ${t('federation')}` })

const { succes } = await $client.auth.logout.mutate()
succes && setTimeout(() => { navigateTo(localePath('/auth/login')) }, 3000)

</script>

<template>
  <LandingPage :title="$t('title.logout')">
    <v-row>
      <v-col class="ma-auto">
        <v-divider class="border-opacity-25"></v-divider>
      </v-col>
    </v-row>
    <!-- <div>
      <p>You're logged out!</p>
    </div> -->
    <v-row>
      <v-col class="ma-auto">
        <!-- <p class="text-h5">Forgot your password?</p> -->
        <!-- <p class="text-body-1">You're logged out!</p> -->
        <p class="text-body-1">{{ succes ? $t('auth.logged_out') : 'Something went wrong...'}}</p>
      </v-col>
    </v-row>
  </LandingPage>
</template>