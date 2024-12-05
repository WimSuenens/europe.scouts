<script setup lang="ts">
import { AuthStatus } from '~/types';
const { t } = useI18n()
const localePath = useLocalePath()
// import { useField, useForm } from 'vee-validate'
import type { VForm } from 'vuetify/components';
import type { Gender } from '@prisma/client';

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
useHead({title: `${t('title.welcome')} | ${t('federation')}`})

const { $client } = useNuxtApp()

const { user } = await $client.auth.session.mutate() 
const genders = ref(['MALE', 'FEMALE'])

const form = reactive({
  firstname: "",
  lastname: "",
  date_of_birth: new Date(Date.now()) as Date,
  gender: "" as Gender,
  address: {
    street: '',
    zip: '',
    community: '',
    country: '',
  },
})

const rules = reactive({
  firstname: [
    (v: string) => !!v || 'Firstname is required',
  ],
  lastname: [
    (v: string) => !!v || 'Lastname is required',
  ],
  gender: [
    (v: string) => !!v || 'Gender is required',
  ]
})

const { value: snackbar } = useSnackbar()
async function submit($event: SubmitEvent) {
  $event.preventDefault();
  $event.stopPropagation();
  console.log('myForm', myForm)
  try {
    var { valid, errors } = await myForm.value?.validate()!;
    // console.log('submit', valid, errors, $event)
    if (!valid) return
    const response = await $client.auth.onboard.mutate(form)
    if (!('error' in response)) {
      await navigateTo(localePath("/"))
    }
    else {
      snackbar.show = true
      snackbar.text = response.error
    }
  } catch (error: any) {
    console.error(error)
    snackbar.show = true
    snackbar.text = error.message
    
  }
}

const myForm = ref<VForm>();

</script>

<template>
  <LandingPage :title="$t('title.welcome')">
  
    <v-row class="mb-3">
      <v-col class="ma-auto">
        <v-divider class="border-opacity-25"></v-divider>
      </v-col>
    </v-row>

    <v-form ref="myForm" @submit.stop.prevent="submit">
  
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.firstname"
            :label="$t('label.firstname')" required
            :rules="rules.firstname"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.lastname"
            :label="$t('label.lastname')" required
            :rules="rules.lastname"
          />
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="form.address.street"
            :label="$t('label.street')" required
          />
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field v-model="form.address.zip"
            :label="$t('label.zip')" required
          />
        </v-col>
        <v-col cols="12" md="9">
          <v-text-field v-model="form.address.community"
            :label="$t('label.community')" required
          />
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="form.address.country"
            :label="$t('label.country')" required
          />
        </v-col>
      </v-row>
          
      <v-row>
        <v-col cols="12" md="6" class="my-auto">
          <!-- <v-date-input v-model="date_of_birth"
            label="Date of birth"
          /> -->
          <v-date-input :label="$t('label.date_of_birth')" v-model="form.date_of_birth"></v-date-input>
        </v-col>

        <v-col cols="12" md="6">
          <v-radio-group :label="$t('label.gender')" v-model="form.gender" :rules="rules.gender">
            <v-radio v-for="(item , i) in genders" :key="i" :label="t(`enum.gender.${item}`)" :value="item"></v-radio>
          </v-radio-group>
        </v-col>

      </v-row>

      <v-row>
        <v-col class="ma-auto">
          <v-divider class="border-opacity-25"></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
        </v-col>

        <v-col>
          <v-btn class="mt-2" color="primary" type="submit" block>{{ $t('label.confirm') }}</v-btn>
        </v-col>
      </v-row>

    </v-form>

  </LandingPage>

</template>