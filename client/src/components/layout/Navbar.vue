<template>
  <v-app-bar
    app
    color="white"
    flat
    max-height="65"
  >
    <v-tabs color="blue lighten-3">
      <v-tab to="/">Home</v-tab>
      <v-tab to="/about">About</v-tab>
    </v-tabs>
    <v-tab
      class="d-none d-sm-flex mr-2"
      disabled
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
};
</script>

<style>
.v-tab {
  font-size: 16px;
}

.v-tab:first-of-type {
  margin-left: 15px;
}
</style>
