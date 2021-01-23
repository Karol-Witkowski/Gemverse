<template>
  <v-card  cols="12">
    <v-card-title>
      <span class="headline grey--text text--lighten-1">Add new room</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              hint="Required"
              label="Room Name"
              persistent-hint
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              disabled
              label="Password (optional)"
              type="password"
              persistent-hint
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="pb-4">
      <v-btn
        color="blue lighten-2"
        text
        outlined
        v-on:click="$emit('close-dialog')"
      >
        Close
      </v-btn>
      <v-spacer />
      <v-btn
        color="blue lighten-2"
        text
        outlined
        v-on:click="$emit('close-dialog')"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'AddRoom',

  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    },
  },
};
</script>
