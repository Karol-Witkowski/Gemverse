<template>
  <v-container class="mt-12">
    <v-card
      class="mt-12 mx-auto"
      max-width="500px"
    >
      <v-card-title>
        <span class="headline grey--text text--darken-2">Sign in to start chatting *disabled*</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form
            ref="form"
            v-model="isFormValid"
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Username"
                  required
                  :rules="generalRules.concat(usernameRules)"
                  v-model="username"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password"
                  required
                  :rules="generalRules.concat(passwordRules)"
                  type="password"
                  v-model="password"
                />
              </v-col>
            </v-row>
            <span>All fields are case-sensitive</span>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions class="pb-4">
        <v-btn
          color="primary"
          text
          to="/"
          outlined
        >
          Close
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          :disabled="!isFormValid"
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
  data() {
    return {
      password: '',
      username: '',
      isFormValid: false,
      usernameRules: [
        (value) => value.length <= 128 || 'Username must be less or equal to 128 characters',
      ],
      passwordRules: [
        (value) => value.length <= 128 || 'Password must be less or equal to 128 characters',
      ],
      generalRules: [
        (value) => !!value || 'Required',
      ],
    };
  },
};
</script>
