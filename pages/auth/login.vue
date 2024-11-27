<script setup lang="ts">
import { AuthStatus } from '~/types';

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

const { $client } = useNuxtApp()
const { redirectedFrom } = useRoute()

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
    (v: string) => (v && v.length >= 10) || 'Password must be at least 10 characters'
  ]
})

async function submit($event: SubmitEvent) {
  $event.preventDefault()
  var user = await $client.auth.login.mutate(form)
  await navigateTo(redirectedFrom?.fullPath ?? '/')
}
</script>

<template>
  <LandingPage title="Login">
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
              label="E-mail" required
              :rules="rules.email"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="ma-auto">
            <v-text-field v-model="form.password"
              label="Password" required
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
            <NuxtLink to="/auth/forgot">Forgot your password?</NuxtLink>
          </v-col>
          <v-col class="ma-auto" cols="12" sm="6">
            <v-btn color="primary" type="submit" block>Login</v-btn>
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
          <span>Not yet registered? </span>
          <NuxtLink to="/auth/register">Create an account</NuxtLink>
        </v-col>
      </v-row>
    </div>

  </LandingPage>
</template>