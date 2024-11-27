<script setup lang="ts">
import { AuthStatus } from '~/types';

definePageMeta({
  layout: "landing",
  auth: {
    accepted: AuthStatus.VERIFICATION,
    redirect: {
      UNAUTHENTICATED: '/auth/login',
      ONBOARDING: '/auth/onboarding',
      AUTHENTICATED: '/'
    }
  }
})
// https://vuetifyjs.com/en/components/otp-input/#card-variants
const { $client } = useNuxtApp()
const { redirectedFrom } = useRoute()

const { sent } = await $client.auth.request.mutate()

const loading = ref(false)

const form = reactive({
  code: '',
})

const rules = reactive({
  code: [
    (v: string) => !!v || 'The code is required',
    (v: string) => (v && v.length == 6) || 'The code should be a 6 digit number'
  ]
})

async function resend() {
  loading.value = true
  const { sent } = await $client.auth.request.mutate(true)
  loading.value = false
}

async function submit($event: SubmitEvent) {
  loading.value = true
  const { success } = await $client.auth.verify.mutate(form)
  loading.value = false
  !!success && await navigateTo(redirectedFrom?.fullPath ?? '/')
}
</script>

<template>
  <LandingPage title="Verification">
    <v-row>
      <v-col class="ma-auto">
        <v-divider class="border-opacity-25"></v-divider>
      </v-col>
    </v-row>
    <v-form @submit.stop.prevent="submit" class="my-3">
      <v-row>
        <v-col class="ma-auto">
          <v-otp-input v-model="form.code"
            label="Code" length="6" required :loading="loading"
          >
          </v-otp-input>

          <!-- <v-text-field v-model="form.code"
            type="number"
            label="Code" required
            :rules="rules.code"
          >
          </v-text-field> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col class="ma-auto" cols="12" sm="6">
          <v-btn color="secondary" @click="resend" block>Resend</v-btn>
        </v-col>
        <v-col class="ma-auto" cols="12" sm="6">
          <v-btn color="primary" type="submit" block>Confirm</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </LandingPage>
</template>