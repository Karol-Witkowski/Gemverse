<template>
  <v-app>
    <Navbar />
    <router-view />
  </v-app>
</template>

<script>
import Navbar from './components/layout/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>
