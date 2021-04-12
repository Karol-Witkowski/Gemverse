<template>
  <v-container
    class="mt-16 pt-16"
    fluid
  >
    <v-flex class="xs12 mx-6">
      <v-card>
        <v-card-title>
          <h3 class="grey--text mb-2 text--darken-1">
            Gemverse - a real-time chat
          </h3>
          <p class="grey--text mb-0 text--darken-1">
            Gemverse is a chat app that keeps you connected with coworker and
            friends wherever you are. User can create own public and
            private rooms or join to one already made.
            To get started click the button below and create a new account.
          </p>
        </v-card-title>
        <v-card-actions v-if="!isAuthorized">
          <v-btn
            class="ml-2 mr-3"
            color="blue lighten-2"
            outlined
            to="/login"
          >
            sign in
          </v-btn>
          <span class="grey--text text--darken-2">or</span>
          <v-btn
            class="ml-3"
            color="blue lighten-2"
            outlined
            to="/register"
          >
            sign up
          </v-btn>
        </v-card-actions>
        <v-card-actions v-if="isAuthorized">
          <v-btn
            class="ml-2"
            color="blue lighten-2"
            outlined
            to="/roomlist"
          >
            Room list
          </v-btn>
        </v-card-actions>
        <v-img
          alt="Group of people chatting via multi-platform app"
          class="ml-auto mt-6"
          max-width="60%"
          min-width="320px"
          src="..\assets\img\homeBanner.png"
        />
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['isAuthorized']),
  },
};
</script>

<style lang="scss">
h3, p {
  text-align: justify;
  text-justify: inter-word;
  word-break: normal;
}
</style>
