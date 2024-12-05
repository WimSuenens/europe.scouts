<script setup lang="ts">
import { AuthStatus } from '~/types';
const localePath = useLocalePath()
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
  }
})

useHead({
  title: `${t('auth.forgot')} | ${t('federation')}`
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
  <LandingPage :title="$t('auth.forgot')">
    <v-row>
      <v-col class="ma-auto">
        <v-divider class="border-opacity-25"></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="ma-auto">
        <!-- <p class="text-h5">Forgot your password?</p> -->
        <p class="text-body-1">{{ $t('auth.forgot_help') }}</p>
      </v-col>
    </v-row>

    <v-form @submit.stop.prevent="submit" class="my-3">
        <v-row>
          <v-col class="ma-auto">
            <v-text-field v-model="email"
              :label="$t('label.email')" required
              :rules="emailRules"
            >
            </v-text-field>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col class="ma-auto">
            <NuxtLink :to="localePath('/auth/login')">{{ $t('auth.tologin') }}</NuxtLink>
          </v-col>
          <v-col class="ma-auto" cols="6">
            <v-btn color="primary" type="submit" block>{{ $t('label.reset') }}</v-btn>
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

  </LandingPage>
</template>