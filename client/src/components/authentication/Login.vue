<template>
  <v-container class="mt-12">
    <v-alert
      class="mt-8 mx-auto"
      dense
      max-width="500"
      type="error"
      v-bind:class="[authError ? 'authErrorAlert' : 'whiteSpace']"
    >
      <v-row align="center">
        <v-col class="grow">
          <strong class="mx-auto">{{ authError }}</strong>
        </v-col>
        <v-col class="shrink">
          <v-btn
            @click="showAuthError"
            small
          >
            OK
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-card
      class="mt-8 mx-auto"
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
                  :error-messages="passwordError"
                  label="Password"
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
  props: ['message'],
  data() {
    return {
      authError: this.message,
      email: '',
      isFormValid: false,
      password: '',
      passwordError: '',
      placeholder: 'whiteSpace',
      userError: '',
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

  created() {
    this.setAuthToken();
  },

  methods: {
    dispatchToken() {
      if (localStorage.getItem('authenticationToken')) {
        this.$store.dispatch('remitAuthState', true);
      } else {
        localStorage.clear();
        this.$store.dispatch('remitAuthState', false);
      }
    },

    formValidation() {
      if (this.isFormValid) {
        this.login();
      }
    },

    login() {
      axios.post('http://localhost:3000/api/authentication/login', {
        email: this.email,
        password: this.password,
      })
        .then((response) => {
          localStorage.setItem('authenticationToken', response.data.token);
          this.setAuthToken(response.data.token);
          this.dispatchToken();

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

    setAuthToken(token) {
      if (token) axios.defaults.headers.common.Authorization = token;
      else delete axios.defaults.headers.common.Authorization;
    },

    showAuthError() {
      this.authError = '';
    },
  },
};
</script>

<style>
.authErrorAlert {
  visibility: visible;
}

.whiteSpace {
  opacity: 0;
  transition: visibility 0.3s linear,opacity 0.3s linear;
  visibility: hidden;
}
</style>
