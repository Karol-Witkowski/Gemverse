<template>
  <v-card cols="12">
    <v-card-title class="headline grey--text text--darken-2">
      Add new room
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="isFormValid">
        <v-col cols="12">
          <v-text-field
            autofocus
            :counter="15"
            :error-messages="nameError"
            hint="Required"
            id="name"
            label="Room Name"
            persistent-hint
            required
            :rules="nameRules"
            v-model.trim="room.name"
            v-on:keyup="nameError = ''"
            v-on:keyup.enter="formValidation"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            :error-messages="passwordError"
            label="Password - optional"
            :rules="passwordRules"
            type="password"
            v-model.trim="room.password"
            v-on:keyup="passwordError = ''"
            v-on:keyup.enter="formValidation"
          />
        </v-col>
      </v-form>
    </v-card-text>
    <v-card-actions class="pb-4">
      <v-btn @click="closeModal" color="primary" outlined text>
        Close
      </v-btn>
      <v-spacer />
      <v-btn
        @click.prevent="formValidation"
        color="primary"
        :disabled="!isFormValid"
        outlined
        text
        type="submit"
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
      nameError: '',
      passwordError: '',
      nameRules: [
        value => (value.length >= 3 && value.length <= 15) || 'Characters range: 3 - 15',
        value => !!value || 'Required'
      ],
      passwordRules: [
        value => !/[ ]/.test(value) || 'No blank spaces allowed',
        value =>
          ((value.length === 0 || value.length >= 6) && value.length <= 128) ||
          'Password must be at least 6 characters long'
      ],
      room: {
        name: '',
        password: ''
      },
      socket: io('http://localhost:3000')
    };
  },

  computed: {
    ...mapGetters(['getUserInfo'])
  },

  methods: {
    closeModal() {
      this.$emit('close-modal');
      this.nameError = '';
      this.passwordError = '';
      this.resetData();
      this.$refs.form.resetValidation();
    },

    createRoom() {
      axios
        .post('http://localhost:3000/api/room', this.room)
        .then(response => {
          if (response.status === 201) {
            this.socket.emit('createRoom', response.data.data);
            this.closeModal();
          }
        })
        .catch((error) => {
          if (error.response.data.errors.name) {
            this.nameError = error.response.data.errors.name.msg;
          }

          if (error.response.data.errors.password) {
            this.passwordError = error.response.data.errors.password.msg;
          }
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
    }
  }
};
</script>
