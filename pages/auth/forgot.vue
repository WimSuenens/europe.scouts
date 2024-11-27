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

const email = ref("");

const emailRules = ref([
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
]);

async function submit($event: SubmitEvent) {
  $event.preventDefault()
  $event.stopPropagation()
}
</script>

<template>
  <LandingPage title="Forgot your password?">
    <v-row>
      <v-col class="ma-auto">
        <v-divider class="border-opacity-25"></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="ma-auto">
        <!-- <p class="text-h5">Forgot your password?</p> -->
        <p class="text-caption">Please enter the email address associated with your account and we will email you a link to reset your password.</p>
        <div>
        </div>
      </v-col>
    </v-row>

    <v-form @submit.stop.prevent="submit" class="my-3">
        <v-row>
          <v-col class="ma-auto">
            <v-text-field v-model="email"
              label="E-mail" required
              :rules="emailRules"
            >
            </v-text-field>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col class="ma-auto">
            <NuxtLink to="/auth/login">Try to login?</NuxtLink>
          </v-col>
          <v-col class="ma-auto" cols="6">
            <v-btn color="primary" type="submit" block>Reset</v-btn>
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

  </LandingPage>
  <!-- <div class="d-flex align-center flex-grow-1">
    <v-container>
    </v-container>
  </div> -->
</template>