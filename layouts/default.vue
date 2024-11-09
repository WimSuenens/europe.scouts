<template>
  <v-app :class="mobile ? 'pa-2' : '' ">
    <v-locale-provider>
      <AppHeader/>
      <AppSidebar/>
      <!-- <v-main :class="mobile ? 'ma-4' : '' ">
        <slot />
      </v-main>  -->
      <v-main
        class="my-2"
        :style="!mobile ? (!sidebar.mini ? '--v-layout-left: calc(256px + 1rem);' : '--v-layout-left: calc(56px + 1rem);') : ''"
      >
        <slot />
      </v-main> 
      <!-- <v-container>
        <div>
          <slot/>
        </div>
      </v-container> -->
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
  import { useDisplay } from 'vuetify';

  const { mobile } = useDisplay();
  const sidebar = useSidebar();

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