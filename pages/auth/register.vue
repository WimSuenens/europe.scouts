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

const form = reactive({
  // firstname: '',
  // lastname: '',
  email: '',
  password: '',
  password_show: false,
  password_confirm: '',
  password_confirm_show: false
})

const rules = reactive({
  // firstname: [
  //   (v: string) => !!v || 'Firstname is required',
  // ],
  // lastname: [
  //   (v: string) => !!v || 'Lastname is required',
  // ],
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

async function submit($event: SubmitEvent) {
  try {
    var user = await $client.auth.register.mutate(form);
    await navigateTo('/auth/login');
  } catch (error) {
    console.error(error)
  }
  // var user = await $fetch<User>('/api/register', {
  //   method: 'POST',
  //   body
  // })
  // signIn('credentials', {
  //   ...credentials,
  // })
}
</script>

<template>
  <LandingPage title="Register">

    <v-row>
        <v-col class="ma-auto">
          <v-divider class="border-opacity-25"></v-divider>
        </v-col>
      </v-row>

    <v-form @submit.stop.prevent="submit" class="my-3">

        <!-- <v-row>

          <v-col class="ma-auto" cols="12" sm="6">
            <v-text-field v-model="form.firstname"
              label="Firstname" required
              :rules="rules.firstname"
            >
            </v-text-field>
          </v-col>

          <v-col class="ma-auto" cols="12" sm="6">
            <v-text-field v-model="form.lastname"
              label="Lastname" required
              :rules="rules.lastname"
            >
            </v-text-field>
          </v-col>

        </v-row> -->
        
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

          <v-col class="ma-auto" cols="12" sm="6">
            <v-text-field v-model="form.password"
              label="Password" required
              :type="form.password_show ? 'text' : 'password'"
              :rules="rules.password"
              :append-icon="form.password_show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="form.password_show = !form.password_show"
            >
            </v-text-field>
          </v-col>

          <v-col class="ma-auto" cols="12" sm="6">
            <v-text-field v-model="form.password_confirm"
              label="Confirm password" required
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
            <span>Already registered? </span>
            <NuxtLink to="/auth/login">Login</NuxtLink>
          </v-col>

          <v-col class="ma-auto" cols="12" sm="6">
            <v-btn class="mt-2" color="primary" type="submit" block>Register</v-btn>
          </v-col>
        </v-row>
      </v-form>

  </LandingPage>
  <!-- <div class="d-flex align-center flex-grow-1">
    <v-container>
    </v-container>
  </div> -->
</template>