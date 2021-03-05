<template>
  <v-container class="mt-12">
    <v-card
      class="mt-12 mx-auto"
      max-width="500px"
    >
      <v-card-title>
        <span class="headline grey--text text--darken-2">Create account *disabled*</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form
            ref="form"
            v-model="isFormValid"
          >
            <v-row class="mb-2">
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
                    label="E-mail address"
                    required
                    :rules="generalRules.concat(emailRules)"
                    v-model="emailAdress"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    hint="Minimum length - 6 characters"
                    label="Password"
                    persistent-hint
                    required
                    :rules="generalRules.concat(passwordRules)"
                    type="password"
                    v-model="password"
                  />
                </v-col>
            </v-row>
            <span>All fields are required and case-sensitive</span>
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
          Sign up
        </v-btn>
      </v-card-actions>
    </v-card>
    <div class="mt-6 text-center">
      <h4 class="grey--text mx-auto mb-2 text--darken-1">Already have an account? Sign in</h4>
      <v-btn
        color="blue lighten-1"
        text
        to="/login"
        outlined
      >
        Sign in
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      emailAdress: '',
      password: '',
      username: '',
      isFormValid: false,
      emailRules: [
        (value) => (value.length >= 5 && value.length <= 128) || 'E-mail adress must be at least 5 characters long',
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail';
        },
      ],
      usernameRules: [
        (value) => (value.length >= 3 && value.length <= 15) || 'Characters range: 3 - 15',
      ],
      passwordRules: [
        (value) => (value.length >= 6 && value.length <= 128) || 'Password must be at least 6 characters long',
      ],
      generalRules: [
        (value) => !(/[ ]/.test(value)) || 'No blank spaces allowed',
        (value) => !!value || 'Required',
      ],
    };
  },
};
</script>
