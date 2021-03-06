<template>
  <v-container class="mt-12">
    <v-card
      class="mt-12 mx-auto"
      max-width="500px"
    >
      <v-card-title>
        <span class="headline grey--text text--darken-2">Create account</span>
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
                  autofocus
                  label="Username"
                  required
                  :rules="generalRules.concat(usernameRules)"
                  v-model="user.username"
                  v-on:keyup.enter="formValidation"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="E-mail address"
                  required
                  :rules="generalRules.concat(emailRules)"
                  v-model="user.email"
                  v-on:keyup.enter="formValidation"
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
                  v-model="user.password"
                  v-on:keyup.enter="formValidation"
                />
              </v-col>
            </v-row>
            <p v-if="error">{{ error }}</p>
            <p>All fields are required and case-sensitive</p>
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
          Back
        </v-btn>
        <v-spacer />
        <v-btn
          @click.prevent="formValidation"
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
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      error: '',
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
      user: {
        username: '',
        email: '',
        password: '',
      },
    };
  },

  methods: {
    createUser() {
      axios.post('http://localhost:3000/api/user', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
        .then(() => {
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
        });
    },

    formValidation() {
      if (this.isFormValid) {
        this.error = '';
        this.createUser();
      }
    },
  },
};
</script>
