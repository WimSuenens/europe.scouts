<script setup lang="ts">
import { AuthStatus } from '~/types';

definePageMeta({
  auth: {
    accepted: AuthStatus.UNAUTHENTICATED,
    redirect: {
      VERIFICATION: '/auth/verification',
      ONBOARDING: '/auth/onboarding',
      AUTHENTICATED: '/'
    }
  }
})
</script>

<template>
  <h1>Guest Page</h1>
</template>