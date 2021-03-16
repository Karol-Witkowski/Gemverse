<template>
  <v-container
    class="mt-16 pt-16"
    fluid
  >
    <v-flex class="xs12 sm12 mx-10">
      <v-card>
        <v-card-title>
          <h3 class="grey--text text--darken-2 mb-2">
            Gemverse - a real-time chat
          </h3>
          <span class="grey--text text--darken-2">
            Gemverse is a chat app that keeps you connected with coworker and
            friends wherever you are. User can create own rooms or join to one already made.
            To get started click the button below.
          </span>
        </v-card-title>
        <v-card-actions v-if="!isAuthorized">
          <v-btn
            class="ml-2 mr-4"
            color="blue lighten-2"
            to="/login"
            outlined
          >
            Sign in
          </v-btn>
          <span class="grey--text text--darken-2">or</span>
          <v-btn
            class="ml-4"
            color="blue lighten-2"
            to="/register"
            outlined
          >
            Sign up
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
h3 {
  word-break: normal;
}

span {
  font-size: 1em;
  text-align: justify;
  text-justify: inter-word;
  word-break: normal;
}
</style>
