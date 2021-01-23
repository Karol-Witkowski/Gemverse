<template>
  <v-app-bar
    color="white"
    flat
    max-height="65"
  >
    <v-tabs
      color="blue lighten-3"
    >
      <v-tab to="/">Home</v-tab>
      <v-tab to="/about">About</v-tab>
    </v-tabs>
    <v-tab
      class="d-none d-sm-flex mt-1 mr-2"
      disabled
      style="font-size: 16px"
    >
      Gemverse
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
        alt="App logo - fractured gem"
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
