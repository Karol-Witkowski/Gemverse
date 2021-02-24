<template>
  <v-container class="mt-12">
    <v-card
      class="mt-12 mx-auto"
      max-width="500px"
    >
      <v-card-title>
        <span class="headline grey--text text--darken-2">Sign in to start chatting</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Username"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password"
                required
                type="password"
              />
            </v-col>
          </v-row>
          All fields are case-sensitive
        </v-container>
      </v-card-text>
      <v-card-actions class="pb-4">
        <v-btn
          color="blue lighten-2"
          text
          to="/"
          outlined
        >
          Close
        </v-btn>
        <v-spacer />
        <v-btn
          color="blue lighten-2"
          text
          to="/roomlist"
          outlined
        >
          Sign in
        </v-btn>
      </v-card-actions>
    </v-card>
    <div class="mt-6 text-center">
      <h4 class="grey--text mx-auto mb-2 text--darken-1">New to Gemverse? Create a new account</h4>
      <v-btn
        color="blue lighten-1"
        text
        to="/register"
        outlined
      >
        Sign up
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
};
</script>
