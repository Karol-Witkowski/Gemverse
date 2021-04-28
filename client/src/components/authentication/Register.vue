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
                  :error-messages="usernameError"
                  :counter="15"
                  label="Username"
                  ref="username"
                  required
                  :rules="generalRules.concat(usernameRules)"
                  v-model.trim="username"
                  v-on:keyup="usernameError = ''"
                  v-on:keyup.enter="formValidation"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :error-messages="emailError"
                  label="E-mail address"
                  ref="email"
                  required
                  :rules="generalRules.concat(emailRules)"
                  v-model.trim="email"
                  v-on:keyup="emailError = ''"
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
                  v-model.trim="password"
                  v-on:keyup.enter="formValidation"
                />
              </v-col>
            </v-row>
            <p>All fields are required and case-sensitive</p>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions class="pb-4">
        <v-btn
          color="primary"
          outlined
          text
          to="/"
        >
          back
        </v-btn>
        <v-spacer />
        <v-btn
          @click.prevent="formValidation"
          color="primary"
          :disabled="!isFormValid"
          outlined
          text
        >
          sign up
        </v-btn>
      </v-card-actions>
    </v-card>
    <div class="mt-6 text-center">
      <h4 class="grey--text mx-auto mb-2 text--darken-1">Already have an account? Sign in</h4>
      <v-btn
        color="blue lighten-1"
        outlined
        text
        to="/login"
      >
        sign in
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import tokenSetter from '@/utils/authTokenSetter';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      username: '',
      isFormValid: false,
      errors: {},
      emailError: '',
      usernameError: '',
      generalRules: [
        (value) => !(/[ ]/.test(value)) || 'No blank spaces allowed',
        (value) => !!value || 'Required',
      ],
      emailRules: [
        (value) => (value.length >= 8 && value.length <= 128) || 'E-mail adress must be at least 8 characters long',
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail';
        },
      ],
      passwordRules: [
        (value) => (value.length >= 6 && value.length <= 128) || 'Password must be at least 6 characters long',
      ],
      usernameRules: [
        (value) => (value.length >= 3 && value.length <= 15) || 'Characters range: 3 - 15',
      ],
    };
  },

  methods: {
    createUser() {
      axios.post('http://localhost:3000/api/authentication/register', {
        email: this.email,
        password: this.password,
        username: this.username,
      })
        .then((response) => {
          localStorage.setItem('authenticationToken', response.data.token);
          tokenSetter(response.data.token);
          this.dispatchToken();
          this.$store.dispatch('saveUser', response.data.user);

          if (response.status === 201) {
            this.$router.push({
              name: 'RoomList',
            });
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.errors.email) {
            this.emailError = error.response.data.errors.email.msg;
          }

          if (error.response.data.errors.username) {
            this.usernameError = error.response.data.errors.username.msg;
          }
        });
    },

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
        this.createUser();
      }
    },
  },
};
</script>
