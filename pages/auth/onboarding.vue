<script setup lang="ts">
import { AuthStatus } from '~/types';

definePageMeta({
  layout: 'landing',
  auth: {
    accepted: AuthStatus.ONBOARDING,
    redirect: {
      UNAUTHENTICATED: '/auth/login',
      VERIFICATION: '/auth/verification',
      AUTHENTICATED: '/'
    }
  }
})

const { $client } = useNuxtApp()

const { user } = await $client.auth.session.mutate() 

const firstname = ref("")
const lastname = ref("")
const date_of_birth = ref()
const street_and_nr = ref("")
const zip_code = ref("")
const community = ref("")
const country = ref("")

const firstNameRules = ref([
  (v: string) => !!v || 'Firstname is required',
]);
const lastNameRules = ref([
  (v: string) => !!v || 'Firstname is required',
]);

function submit($event: SubmitEvent) {
  $event.preventDefault();
  $event.stopPropagation();
  console.log("date_of_birth", date_of_birth.value)
}

</script>

<template>
  <LandingPage title="Welcome">
  
    <v-form @submit.stop.prevent="submit">
  
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="firstname"
            label="Firstname" required
            :rules="firstNameRules"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="lastname"
            label="Lastname" required
            :rules="lastNameRules"
          />
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="street_and_nr"
            label="Street & Nr" required
          />
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field v-model="zip_code"
            label="Zip Code" required
          />
        </v-col>
        <v-col cols="12" md="9">
          <v-text-field v-model="community"
            label="Community" required
          />
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="country"
            label="Country" required
          />
        </v-col>
      </v-row>
          
      <v-row>
        <v-col cols="6">
          <!-- <v-date-input v-model="date_of_birth"
            label="Date of birth"
          /> -->
          <v-date-input label="Date of birth" v-model="date_of_birth"></v-date-input>
        </v-col>

        <v-col>
          <v-btn class="mt-2" color="primary" type="submit" block>Continue</v-btn>
        </v-col>
      </v-row>

    </v-form>

  </LandingPage>

</template>