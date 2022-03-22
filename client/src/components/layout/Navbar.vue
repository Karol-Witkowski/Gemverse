<template>
  <v-app-bar app color="white" flat max-height="65">
    <v-menu align="center" justify="space-around">
      <template v-slot:activator="{ on: menu, attrs }">
        <v-btn
          class="d-flex d-md-none mx-auto"
          color="primary"
          dark
          name="menu"
          outlined
          small
          width="200"
          v-bind="attrs"
          v-on="{ ...menu }"
        >
          <v-icon alt="hamburger menu">menu</v-icon>
        </v-btn>
        <v-spacer />
      </template>
      <v-list class="font-weight-bold grey--text mobileMenu text-uppercase">
        <v-list-item to="/">home</v-list-item>
        <v-list-item name="list" to="/roomlist" v-if="isAuthorized"> rooms </v-list-item>
        <v-list-item name="profile" to="/profile" v-if="isAuthorized"> profile </v-list-item>
        <v-list-item to="/about">about</v-list-item>
        <v-list-item v-if="isAuthorized">
          <v-btn
            class="mx-auto"
            @click.prevent="logout"
            color="primary"
            name="logout"
            outlined
            small
            width="250"
          >
            logout
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-tabs class="d-none d-md-block" color="primary">
      <v-tab name="home" to="/"> home </v-tab>
      <v-tab name="list" to="/roomlist" v-if="isAuthorized"> rooms </v-tab>
      <v-tab name="profile" to="/profile" v-if="isAuthorized"> profile </v-tab>
      <v-tab name="about" to="/about"> about </v-tab>
    </v-tabs>
    <v-tab class="appName grey--text menu text--darken-2" name="logo" to="/"> gemverse </v-tab>
    <v-tab
      class="grey--text hidden-xs-only menu mx-2 text--darken-2"
      @click.prevent="logout"
      name="logout"
      v-if="isAuthorized"
    >
      logout
    </v-tab>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Navbar",

  created() {
    this.dispatchToken();
  },
  computed: {
    ...mapActions(["remitAuthState"]),
    ...mapGetters(["isAuthorized"]),
  },
  methods: {
    dispatchToken() {
      if (localStorage.getItem("authenticationToken")) {
        this.$store.dispatch("remitAuthState", true);
      } else {
        localStorage.clear();

        this.$store.dispatch("remitAuthState", false);
      }
    },

    logout() {
      if (localStorage.getItem("authenticationToken")) {
        localStorage.clear();

        this.$store.dispatch("remitAuthState", false);
        this.$store.dispatch("saveUser", "");
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

<style lang="scss">
.appName {
  letter-spacing: 4px !important;
}

.mobileMenu {
  font-size: 0.8em !important;
}

.v-toolbar__content {
  height: 45px !important;
}
</style>
