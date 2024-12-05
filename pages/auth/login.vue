<script setup lang="ts">
import { AuthStatus } from '~/types';
const { t } = useI18n()

definePageMeta({
  layout: "landing",
  auth: {
    accepted: AuthStatus.UNAUTHENTICATED,
    redirect: {
      VERIFICATION: '/auth/verification',
      ONBOARDING: '/auth/onboarding',
      AUTHENTICATED: '/'
    }
  },
})
useHead({ title: `${t('label.login')} | ${t('federation')}` })

const { $client } = useNuxtApp()
const { redirectedFrom } = useRoute()
const localePath = useLocalePath()

const form = reactive({
  email: '',
  password: '',
  show: false
})

const rules = reactive({
  email: [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
  ],
  password: [
    (v: string) => !!v || 'Password is required',
  ]
})

const { value: snackbar } = useSnackbar()

// const snackbar = reactive({
//   show: false,
//   text: '',
// })
// const snackbar = ref(false)
// const text = ref(`Hello, I'm a snackbar`)

async function submit($event: SubmitEvent) {
  $event.preventDefault()
  const response = await $client.auth.login.mutate(form)
  if (!('error' in response)) {
    // await navigateTo(redirectedFrom?.fullPath ?? '/verify')
    await navigateTo(localePath('/auth/verification'));
  } else {
    snackbar.text = response.error
    snackbar.show = true
  }
}
</script>

<!-- <style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 3s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style> -->

<template>
  <LandingPage :title="$t('label.login')">

    <div>
      <!-- <v-row>
        <v-col class="ma-auto">
          <v-divider class="border-opacity-25"></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="ma-auto">
          <v-btn prepend-icon="mdi-github" @click="signIn('github')">
            Log In with Github
          </v-btn>
        </v-col>
      </v-row> -->

      <v-row>
        <v-col class="ma-auto">
          <v-divider class="border-opacity-25"></v-divider>
        </v-col>
      </v-row>

      <v-form @submit="submit" class="my-3">
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
          <v-col class="ma-auto">
            <v-text-field v-model="form.password"
              :label="$t('label.password')" required
              :type="form.show ? 'text' : 'password'"
              :rules="rules.password"
              :append-icon="form.show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="form.show = !form.show"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="ma-auto" cols="12" sm="6">
            <NuxtLink :to="localePath('/auth/forgot')">{{ $t('auth.forgot')}}</NuxtLink>
          </v-col>
          <v-col class="ma-auto" cols="12" sm="6">
            <v-btn color="primary" type="submit" block>{{ $t('label.login') }}</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-row>
        <v-col class="ma-auto">
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <span>{{ $t('auth.registered_not') }}&nbsp;</span>
          <NuxtLink :to="localePath('/auth/register')">{{ $t('auth.create') }}</NuxtLink>
        </v-col>
      </v-row>
    </div>

  </LandingPage>
</template>