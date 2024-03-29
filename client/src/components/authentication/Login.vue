<template>
  <v-container class="mt-12">
    <v-alert
      class="mt-8 mx-auto"
      dense
      max-width="500"
      type="error"
      v-bind:class="[redirectError ? 'errorAlert' : 'whitespace']"
    >
      <v-row align="center">
        <v-col class="grow">
          <strong class="mx-auto">{{ redirectError }}</strong>
        </v-col>
        <v-col class="shrink">
          <v-btn @click="hideRedirectError" name="accept" small> ok </v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-card class="mt-8 mx-auto" max-width="500">
      <v-card-title>
        <span class="headline grey--text text--darken-2">Sign in to start chatting</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="isFormValid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  autofocus
                  :error-messages="userError"
                  label="E-mail address"
                  name="email"
                  required
                  :rules="generalRules.concat(emailRules)"
                  v-model="email"
                  v-on:keyup="[(userError = ''), (passwordError = '')]"
                  v-on:keyup.enter="formValidation"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :error-messages="passwordError"
                  label="Password"
                  name="password"
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
        <v-btn color="primary" name="back" text outlined to="/"> back </v-btn>
        <v-spacer />
        <v-btn
          @click.prevent="formValidation"
          color="primary"
          :disabled="!isFormValid"
          name="login"
          outlined
          text
        >
          sign in
        </v-btn>
      </v-card-actions>
    </v-card>
    <div class="mt-6 text-center">
      <h4 class="grey--text mb-2 mx-auto text--darken-1">New to Gemverse? Create a new account</h4>
      <v-btn color="blue lighten-1" name="register" outlined text to="/register"> sign up </v-btn>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import tokenSetter from "@/utils/authTokenSetter";

export default {
  name: "Login",
  props: ["message"],
  data() {
    return {
      email: "",
      isFormValid: false,
      password: "",
      passwordError: "",
      redirectError: this.message,
      userError: "",
      emailRules: [
        (value) => value.length <= 128 || "E-mail address must be less or equal to 128 characters",
      ],
      passwordRules: [
        (value) => value.length <= 128 || "Password must be less or equal to 128 characters",
      ],
      generalRules: [(value) => !!value || "Required"],
    };
  },

  methods: {
    dispatchToken() {
      if (localStorage.getItem("authenticationToken")) {
        this.$store.dispatch("remitAuthState", true);
      } else {
        localStorage.clear();
        this.$store.dispatch("remitAuthState", false);
      }
    },

    formValidation() {
      if (this.isFormValid) {
        this.login();
      }
    },

    hideRedirectError() {
      this.redirectError = "";
    },

    login() {
      axios
        .post("http://localhost:3000/api/authentication/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("authenticationToken", response.data.token);
          tokenSetter(response.data.token);

          this.dispatchToken();
          this.$store.dispatch("saveUser", response.data.data);

          if (response.status === 200) {
            this.$router.push({
              name: "RoomList",
            });
          }
        })
        .catch((error) => {
          this.passwordError = error.response.data.password;
          this.userError = error.response.data.user;
        });
    },
  },
};
</script>

<style lang="scss">
.errorAlert {
  visibility: visible;
}

.whitespace {
  opacity: 0;
  transition: visibility 0.3s linear, opacity 0.3s linear;
  visibility: hidden;
}
</style>
