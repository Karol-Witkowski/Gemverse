<template>
  <v-card  cols="12">
    <v-card-title>
      <span class="headline grey--text text--lighten-1">Add new room</span>
    </v-card-title>
    <v-card-text>
      <v-container @submit="onSubmit">
        <v-row>
          <v-col cols="12">
            <v-text-field
              hint="Required (3-15 characters)"
              id="name"
              label="Room Name"
              persistent-hint
              required
              v-model.trim="room.name"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              disabled
              hint ="Optional"
              label="Password"
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
        type="submit"
        variant="primary"
        v-on:click="$emit('close-dialog')"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddRoom',
  data() {
    return {
      room: {},
    };
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    },

    onSubmit(evt) {
      evt.preventDefault();
      axios.post('http://localhost:3000/api/room', this.room)
      // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.$router.push({
            name: 'RoomList',
          });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>
