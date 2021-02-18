<template>
  <v-card  cols="12">
    <v-card-title>
      <span class="headline grey--text text--lighten-1">Add new room</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form v-model="isFormValid">
          <v-col cols="12">
            <v-text-field
              :counter="15"
              v-on:keyup.enter="nameValidation()"
              hint="Required"
              id="name"
              label="Room Name"
              persistent-hint
              required
              :rules="nameRules"
              v-model="room.name"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              hint ="Optional"
              label="Password - DISABLED (alpha)"
              persistent-hint
              type="password"
            />
          </v-col>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions class="pb-4">
      <v-btn
        @click="closeDialog"
        color="blue lighten-2"
        text
        outlined
      >
        Close
      </v-btn>
      <v-spacer />
      <v-btn
        @click.prevent="[nameValidation()]"
        :disabled="!isFormValid"
        color="blue lighten-2"
        text
        outlined
        type="submit"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';
import * as io from 'socket.io-client';

export default {
  name: 'AddRoom',
  data() {
    return {
      error: [],
      isFormValid: false,
      nameRules: [
        (value) => !!value || 'Required.',
        (value) => (value && value.length >= 3 && value.length <= 15) || 'Characters range: 3 - 15',
      ],
      room: {
        name: '',
      },
      socket: io('http://localhost:3000'),
    };
  },

  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    },

    createRoom() {
      axios.post('http://localhost:3000/api/room', this.room)
        .then(() => {
          this.socket.emit('createRoom', this.room.name);
          this.room.name = '';
        })
        .catch((e) => {
          // REMINDER Later add handle error message
          this.error.push(e);
        });
    },

    nameValidation() {
      if (this.isFormValid) {
        this.createRoom();
        this.closeDialog();
      }
    },
  },
};
</script>
