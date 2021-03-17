<template>
  <v-container
    class="mt-16 pt-4"
    fluid
  >
    <v-flex
      class="xs12 sm12 mx-6"
    >
      <v-card>
        <v-card-title class="justify-center pt-6">
          <h1 class="grey--text mx-auto text--darken-1">
            404
          </h1>
        </v-card-title>
        <v-card-actions class="justify-center">
          <v-img
            alt="People holding a disconnected wire"
            class="mx-auto"
            max-width="35%"
            min-width="330px"
            src="..\..\assets\img\notFound.jpg"
          />
        </v-card-actions>
        <v-card-actions class="justify-center pb-10">
          <v-btn
            color="primary"
            to="/"
            outlined
          >
            Back to home page
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-container>
</template>
