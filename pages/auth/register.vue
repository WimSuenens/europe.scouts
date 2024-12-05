<script setup lang="ts">
import { AuthStatus } from '~/types';
const { t } = useI18n()
const localePath = useLocalePath()

definePageMeta({
  layout: "landing",
  auth: {
    accepted: AuthStatus.UNAUTHENTICATED,
    redirect: {
      VERIFICATION: '/auth/verification',
      ONBOARDING: '/auth/onboarding',
      AUTHENTICATED: '/'
    }
  }
})

useHead({ title: `${t('auth.create')} | ${t('federation')}` })

const { $client } = useNuxtApp()

const form = reactive({
  email: '',
  password: '',
  password_show: false,
  password_confirm: '',
  password_confirm_show: false
})

const rules = reactive({
  email: [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
  ],
  password: [
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length >= 10) || 'Password must be at least 10 characters'
  ],
  password_confirm: [
    (v: string) => !!v || 'Password confirmation is required',
    (v: string) => (v && v == form.password) || 'Both passwords should be the same.'
  ]
})

const { value: snackbar } = useSnackbar()

async function submit($event: SubmitEvent) {
  try {
    const { password_show, password_confirm_show, ...data } = form
    const response = await $client.auth.register.mutate(data);
    if (!('error' in response)) {
      await navigateTo(localePath('/auth/login'));
    } else {
      snackbar.text = response.error
      snackbar.show = true
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <LandingPage :title="$t('title.register')">

    <v-row>
      <v-col class="ma-auto">
        <v-divider class="border-opacity-25"></v-divider>
      </v-col>
    </v-row>

    <v-form @submit.stop.prevent="submit" class="my-3">

      <v-row>
        <v-col class="ma-auto">
          <v-text-field v-model="form.email"
            :label="$t('label.email')" required
            :rules="rules.email"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>

        <v-col class="ma-auto" cols="12" sm="6">
          <v-text-field v-model="form.password"
            :label="$t('label.password')" required
            :type="form.password_show ? 'text' : 'password'"
            :rules="rules.password"
            :append-icon="form.password_show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="form.password_show = !form.password_show"
          >
          </v-text-field>
        </v-col>

        <v-col class="ma-auto" cols="12" sm="6">
          <v-text-field v-model="form.password_confirm"
            :label="$t('label.password_confirm')" required
            :type="form.password_confirm_show ? 'text' : 'password'"
            :rules="rules.password_confirm"
            :append-icon="form.password_confirm_show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="form.password_confirm_show = !form.password_confirm_show"
          >
          </v-text-field>
        </v-col>

      </v-row>
      
      <v-row>
        <v-col class="ma-auto" cols="12" sm="6">
          <span>{{ $t('auth.registered_already') }}&nbsp;</span>
          <NuxtLink :to="localePath('/auth/login')">{{ $t('label.login') }}</NuxtLink>
        </v-col>

        <v-col class="ma-auto" cols="12" sm="6">
          <v-btn class="mt-2" color="primary" type="submit" block>{{ $t('label.register') }}</v-btn>
        </v-col>
      </v-row>
    </v-form>

  </LandingPage>
</template>