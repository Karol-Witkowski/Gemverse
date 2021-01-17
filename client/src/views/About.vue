<template>
    <v-container
      class="mt-16 ml-7"
      fluid
    >
      <v-flex
        centered
        class="xs12 sm12 mt-16 mx-10"
      >
        <v-card>
          <v-card-title>
            <h3 class="mb-2">
              Gemverse - a real-time chat
            </h3>
            <p class="text-wrap" xs-justify>
              Gemverse is created by combining Vue, Vuetify, Express, Socket.io,
              MongoDB and more. The app aims to provide an alternative for friends
              to hang around and chat. Gemverse is based on rooms - organized channels
              allow you to talk about programming, hobbies, games and more.
              Check my repository at GitHub.
            </p>
          </v-card-title>
          <v-card-actions>
            <v-btn
              color="blue lighten-2"
              href="https://github.com/Karol-Witkowski"
              outlined
            >
              GitHub
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-container>
</template>

<style>
.v-card__text, .v-card__title {
  text-align: justify;
  word-break: normal;
}
</style>
