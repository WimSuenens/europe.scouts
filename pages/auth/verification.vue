<script setup lang="ts">
import { AuthStatus } from '~/types';
const { t } = useI18n()

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
const localePath = useLocalePath()
useHead({ title: `${t('auth.verify')} | ${t('federation')}` })

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
  !!success && await navigateTo(localePath('/auth/onboarding'))
}
</script>

<template>
  <LandingPage :title="$t('auth.verify')">
    <v-row>
      <v-col class="ma-auto">
        <v-divider class="border-opacity-25"></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="ma-auto">
        <p class="text-body-1">{{ $t('auth.verification') }}</p>
      </v-col>
    </v-row>

    <v-form @submit.stop.prevent="submit" class="my-3">
      <v-row>
        <v-col class="ma-auto">
          <v-otp-input v-model="form.code"
            label="Code" length="6" required :loading="loading"
          >
          </v-otp-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="ma-auto" cols="12" sm="6">
          <v-btn color="secondary" @click="resend" block>{{ $t('label.resend') }}</v-btn>
        </v-col>
        <v-col class="ma-auto" cols="12" sm="6">
          <v-btn color="primary" type="submit" block>{{ $t('label.confirm') }}</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </LandingPage>
</template>