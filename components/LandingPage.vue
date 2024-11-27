<script setup lang="ts">
import { useDisplay } from 'vuetify';
defineProps<{
  title?: string
}>()
const { mobile, mdAndUp, smAndDown } = useDisplay()
</script>

<template>
  <v-card elevation="4" :class="'rounded-xl ' + (smAndDown ? 'py-3' : 'py-6')" style="background-image: linear-gradient(to top right, #82c8b4, #ffffff);">
    <v-btn icon="mdi-cog" variant="plain" class="position-absolute top-0 right-0 ma-2" />
    <v-row :class="mdAndUp ? 'ma-9' : 'ma-6'">
      <v-col v-if="mdAndUp" cols="12" md="4" class="d-flex flex-column justify-center">
        <div class="text-center">
          <img src="/images/europascouts.jpg" alt="Logo" class="rounded-xl"/>
        </div>
      </v-col>
      <v-col cols="12" md="8" :class="'d-flex flex-column justify-center '">
        <div class="mb-6">
          <v-row>
            <v-col>
              <div class="d-flex align-center">
                <img src="/logo.svg" alt="Logo" class="rounded-xl" height="64"/>
                <span class="ml-6 text-h5">Europascouts<span v-if="!!title"> | {{ title }}</span></span>
              </div>
            </v-col>
          </v-row>
    
          <slot />

        </div>
      </v-col>
    </v-row>
  </v-card>

</template>