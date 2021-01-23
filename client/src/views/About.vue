<template>
    <v-container
      class="ml-7 mt-16"
      fluid
    >
      <v-flex
        class="xs12 sm12 mx-10"
      >
        <v-card>
          <v-card-title>
            <h3 class="mb-2">
              About app
            </h3>
            <p>
              Gemverse is created by combining Vue, Vuetify, Express, Socket.io,
              MongoDB and more. The app aims to provide an alternative for friends
              to hang around and chat. The app is based on rooms - organized channels
              allow you to talk about programming, hobbies, games and more.
              Check my profile at GitHub.
            </p>
          </v-card-title>
          <v-card-actions>
            <v-btn
              color="blue lighten-2"
              href="https://github.com/Karol-Witkowski"
              outlined
            >
              GITHUB PROFILE
            </v-btn>
          </v-card-actions>
          <v-img
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

h3 {
  color: rgb(100, 98, 98);
  word-break: normal;
}

p {
  @extend h3;
  font-size: 1em;
  text-align: justify;
  text-justify: inter-word;
}
</style>
