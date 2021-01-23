<template>
  <v-card  cols="12">
    <v-card-title>
      <span class="headline grey--text text--lighten-1">Login to start chatting</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              hint="Required"
              label="Username"
              persistent-hint
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              hint="Not required"
              label="Password (Optional) **disabled - dev**"
              type="password"
              persistent-hint
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="blue lighten-2"
        text
        outlined
        v-on:click="$emit('close-dialog')"
      >
        Register
      </v-btn>
      <v-btn
        color="blue lighten-2"
        text
        outlined
        v-on:click="$emit('close-dialog')"
      >
        Close
      </v-btn>
      <v-btn
        color="blue lighten-2"
        text
        outlined
        v-on:click="$emit('close-dialog')"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'Login',
};
</script>
