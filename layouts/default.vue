<template>
  <v-app style="background: rgba(222, 222, 222, 0.8);">
    <v-locale-provider>
      <AppHeader/>
      <v-container>
        <AppSidebar/>
        <v-main>
          <slot />
        </v-main> 
      </v-container>
    </v-locale-provider>
  </v-app>

  <!-- 
  <v-app-bar :elevation="2" color="primary">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Application Bar</v-app-bar-title>
  </v-app-bar>
  -->

  <!-- <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
  >
    <v-list
      :items="items"
    ></v-list>
  </v-navigation-drawer> -->

</template>

<script setup>
  import { ref, watch } from 'vue'

  const drawer = ref(false);
  const items = ref([
    {
      title: 'Foo',
      value: 'foo',
    },
    {
      title: 'Bar',
      value: 'bar',
    },
    {
      title: 'Fizz',
      value: 'fizz',
    },
    {
      title: 'Buzz',
      value: 'buzz',
    },
  ])
</script>