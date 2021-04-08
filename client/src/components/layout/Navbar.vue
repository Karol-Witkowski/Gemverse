<template>
  <v-app-bar
    app
    color="white"
    flat
    max-height="65"
  >
    <v-menu
      align="center"
      justify="space-around"
    >
      <template v-slot:activator="{ on: menu, attrs }">
        <v-btn
          class="d-flex d-sm-none mx-auto"
          color="primary"
          dark
          min-width="180"
          outlined
          v-bind="attrs"
          v-on="{ ...menu }"
        >
          <v-icon>menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/">Home</v-list-item>
        <v-list-item
          to="/roomlist"
          v-if="isAuthorized"
        >
          Rooms
        </v-list-item>
        <v-list-item to="/about">About</v-list-item>
        <v-list-item v-if="isAuthorized">
          <v-btn
            class="mx-auto"
            @click.prevent="logout"
            color="primary"
            outlined
            small
            width="250"
          >
            Logout
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-tabs class="hidden-xs-only" color="primary">
      <v-tab to="/">Home</v-tab>
      <v-tab
        to="/roomlist"
        v-if="isAuthorized"
      >
        Rooms
      </v-tab>
      <v-tab to="/about">About</v-tab>
    </v-tabs>
    <v-tab to="/">
      <span class="appName grey--text text--darken-2">Gemverse</span>
    </v-tab>
    <v-tab
      class="hidden-xs-only mx-2"
      @click.prevent="logout"
      v-if="isAuthorized"
    >
      Logout
    </v-tab>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Navbar',

  created() {
    this.dispatchToken();
  },

  computed: {
    ...mapActions(['remitAuthState']),
    ...mapGetters(['isAuthorized']),
  },

  methods: {
    dispatchToken() {
      if (localStorage.getItem('authenticationToken')) {
        this.$store.dispatch('remitAuthState', true);
      } else {
        localStorage.clear();
        this.$store.dispatch('remitAuthState', false);
      }
    },

    logout() {
      if (localStorage.getItem('authenticationToken')) {
        localStorage.clear();
        this.$store.dispatch('remitAuthState', false);
        this.$store.dispatch('saveUser', '');
        this.$router.push({ name: 'Login' });
      }
    },
  },
};
</script>
<style lang="scss">
.appNavigation {
  font-size: 1px!important;
  font-weight: 600;
}

.appName {
  letter-spacing: 4px;
}
</style>
