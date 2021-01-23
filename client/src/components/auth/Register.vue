<template>
  <v-container pl-16>
    <v-card
      class="mt-12 mx-auto"
      max-width="500px"
    >
      <v-card-title>
        <span class="headline grey--text text--darken-2">Create account *disabled*</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="E-mail address"
                required
                :rules="[rules.required, rules.email]"
                value=""
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Username"
                required
                :rules="[rules.required]"
                value=""
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                hint="At least 6 character password"
                label="Password"
                type="password"
                required
                :rules="[rules.counter, rules.required]"
                value=""
              />
            </v-col>
          </v-row>
          All fields are required and case-sensitive
        </v-container>
      </v-card-text>
      <v-card-actions class="pb-4">
        <v-btn
          color="blue lighten-2"
          text
          to="/login"
          outlined
        >
          Back
        </v-btn>
        <v-spacer />
        <v-btn
          color="blue lighten-2"
          text
          outlined
          to="/roomlist"
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
      rules: {
        required: (value) => !!value || 'Required.',
        counter: (value) => (value.length <= 40 && value.length >= 6) || 'At least 6 character password',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
      },
    };
  },
};
</script>
