<script setup lang="ts">
import { AuthStatus } from '~/types';

definePageMeta({
  layout: "landing",
  auth: {
    accepted: AuthStatus.AUTHENTICATED,
    redirect: {
      UNAUTHENTICATED: '/auth/login',
      VERIFICATION: '/auth/verification',      
      ONBOARDING: '/auth/onboarding',
    }
  }
})

</script>