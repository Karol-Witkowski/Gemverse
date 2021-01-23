<template>
    <v-container
      class="ml-7 mt-4"
      fluid
    >
      <v-flex
        class="xs12 sm12 mx-10"
      >
        <v-card>
          <v-card-title class="justify-center pt-6">
            <h1>
              404
            </h1>
          </v-card-title>
          <v-card-actions class="justify-center">
          <v-img
            class="ml-auto mr-auto"
            max-width="35%"
            min-width="330px"
            src="..\..\assets\img\notFound.jpg"
          />
          </v-card-actions>
          <v-card-actions class="justify-center pb-10">
            <v-btn
              color="blue lighten-2"
              to="/"
              outlined
            >
              BACK TO HOME PAGE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-container>
</template>
