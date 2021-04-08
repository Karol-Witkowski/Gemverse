<template>
  <v-container
    class="mt-16 pt-16"
    fluid
  >
    <v-flex class="xs12 mx-6">
      <v-card>
        <v-card-title>
          <h3 class="grey--text mb-2 text--darken-1">About app</h3>
          <p class="grey--text text--darken-1">
            Gemverse is created by combining Vue, Vuetify, Express, Socket.io,
            MongoDB and more. The app aims to provide an alternative for friends
            to hang around and chat. The app is based on rooms - organized channels
            allow you to talk about programming, hobbies, games and more.
            Check my profile at GitHub.
          </p>
        </v-card-title>
        <v-card-actions>
          <v-btn
            class="ml-2"
            color="blue lighten-2"
            href="https://github.com/Karol-Witkowski"
            outlined
            target="_blank"
          >
            github profile
          </v-btn>
        </v-card-actions>
        <v-img
          alt="Desktop computer screen"
          class="ml-auto mt-6"
          max-width="45%"
          min-width="320px"
          src="..\assets\img\aboutBanner.png"
        />
      </v-card>
    </v-flex>
  </v-container>
</template>

<style lang="scss">
h3, p {
  text-align: justify;
  text-justify: inter-word;
  word-break: normal;
}

</style>
