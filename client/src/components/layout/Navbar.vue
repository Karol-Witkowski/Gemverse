<template>
  <v-app-bar
    color="white"
    flat
    max-height="65"
  >
    <v-tabs
      color="blue lighten-3"
    >
      <v-tab to="/">rooms</v-tab>
      <v-tab to="/about">about</v-tab>
    </v-tabs>
    <v-tab
      class="mt-1 mr-2 d-none d-sm-flex"
      disabled
      style="font-size: 16px"
    >
      GEMVERSE
    </v-tab>
    <v-btn
      color="white"
      elevation="6"
      icon
      large
      outlined
      text
      to="/"
    >
      <v-img
        max-width="40"
        src="..\..\assets\img\logo.png"
      />
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      drawerToggle: false,
    };
  },
};
</script>

<style>
.v-tab:first-of-type {
  margin-left: 80px;
}
</style>
