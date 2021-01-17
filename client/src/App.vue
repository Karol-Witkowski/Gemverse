<template>
  <v-app>
    <Navbar />
    <SideMenu />
    <router-view />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import SideMenu from './components/SideMenu.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    SideMenu,
  },
};
</script>
