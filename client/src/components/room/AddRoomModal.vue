<template>
  <v-card cols="12">
    <v-card-title class="headline grey--text text--darken-2">
      Add new room
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="isFormValid"
      >
        <v-col cols="12">
          <v-text-field
            autofocus
            :counter="15"
            :error-messages="error"
            hint="Required"
            id="name"
            label="Room Name"
            persistent-hint
            required
            :rules="nameRules"
            v-model.trim="room.name"
            v-on:keyup="error = ''"
            v-on:keyup.enter="formValidation"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Password - optional"
            :rules="passwordRules"
            type="password"
            v-model.trim="room.password"
            v-on:keyup.enter="formValidation"
          />
        </v-col>
      </v-form>
    </v-card-text>
    <v-card-actions class="pb-4">
      <v-btn
        @click="closeModal"
        color="primary"
        text
        outlined
      >
        Close
      </v-btn>
      <v-spacer />
      <v-btn
        @click.prevent="formValidation"
        color="primary"
        :disabled="!isFormValid"
        text
        type="submit"
        outlined
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import * as io from 'socket.io-client';

export default {
  name: 'AddRoomModal',
  data() {
    return {
      error: [],
      isFormValid: false,
      nameRules: [
        (value) => (value.length >= 3 && value.length <= 15) || 'Characters range: 3 - 15',
        (value) => !!value || 'Required.',
      ],
      passwordRules: [
        (value) => !(/[ ]/.test(value)) || 'No blank spaces allowed',
        (value) => ((value.length === 0 || value.length >= 6) && value.length <= 128) || 'Password must be at least 6 characters long',
      ],
      room: {
        name: '',
        password: '',
        user: {},
      },
      socket: io('http://localhost:3000'),
    };
  },

  computed: {
    ...mapGetters(['getUserInfo']),
  },

  methods: {
    closeModal() {
      this.$emit('close-modal');
      this.error = '';
      this.resetData();
      this.$refs.form.resetValidation();
    },

    createRoom() {
      axios.post('http://localhost:3000/api/room', this.room)
        .then((response) => {
          this.socket.emit('createRoom', this.room.name, this.room.password, response.data.slug);
          this.resetData();
          if (response.status === 201) {
            this.closeModal();
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
        });
    },

    formValidation() {
      if (this.isFormValid) {
        this.room.user = this.getUserInfo;
        this.createRoom();
      }
    },

    resetData() {
      this.room.name = '';
      this.room.password = '';
    },
  },
};
</script>
