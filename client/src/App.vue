<template>
  <v-app>
    <Navbar />
    <SideMenu />
    <router-view />
  </v-app>
</template>

<script>
import Navbar from './components/layout/Navbar.vue';
import SideMenu from './components/layout/SideMenu.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    SideMenu,
  },
};
</script>
