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
          <v-form
            ref="form"
            v-model="isFormValid"
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  autofocus
                  :error-messages="userError"
                  label="E-mail adress"
                  required
                  :rules="generalRules.concat(emailRules)"
                  v-model="email"
                  v-on:keyup="[userError = '', passwordError = '']"
                  v-on:keyup.enter="formValidation"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password"
                  :error-messages="passwordError"
                  required
                  :rules="generalRules.concat(passwordRules)"
                  type="password"
                  v-model="password"
                  v-on:keyup="passwordError = ''"
                  v-on:keyup.enter="formValidation"
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
          Back
        </v-btn>
        <v-spacer />
        <v-btn
          @click.prevent="formValidation"
          color="primary"
          :disabled="!isFormValid"
          text
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
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      password: '',
      email: '',
      isFormValid: false,
      userError: '',
      passwordError: '',
      emailRules: [
        (value) => value.length <= 128 || 'E-mail adress must be less or equal to 128 characters',
      ],
      passwordRules: [
        (value) => value.length <= 128 || 'Password must be less or equal to 128 characters',
      ],
      generalRules: [
        (value) => !!value || 'Required',
      ],
    };
  },

  methods: {
    login() {
      axios.post('http://localhost:3000/api/authentication/login', {
        email: this.email,
        password: this.password,
      })
        .then((response) => {
          localStorage.setItem('authenticationToken', response.data.token);
          this.setAuthToken(response.data.token);

          if (response.status === 200) {
            this.$router.push({
              name: 'RoomList',
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.userError = error.response.data.user;
          this.passwordError = error.response.data.password;
        });
    },

    formValidation() {
      if (this.isFormValid) {
        this.login();
      }
    },

    setAuthToken(token) {
      if (token) axios.defaults.headers.common.Authorization = token;
      else delete axios.defaults.headers.common.Authorization;
    },
  },
};
</script>
