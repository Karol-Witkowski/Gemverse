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
              Gemverse - a real-time chat
            </h3>
            <p>
              Gemverse is a chat app that keeps you connected with coworker and
              friends wherever you are. User can create own rooms or join to one already made.
              To get started click the button below.
            </p>
          </v-card-title>
          <v-card-actions>
            <v-btn
              color="blue lighten-2"
              to="/roomlist"
              outlined
            >
              START CHATTING
            </v-btn>
          </v-card-actions>
          <v-card-actions class="justify-end">
            <v-img
              max-width="60%"
              min-width="400px"
              src="..\assets\img\homeBanner.png"
            />
          </v-card-actions>
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
