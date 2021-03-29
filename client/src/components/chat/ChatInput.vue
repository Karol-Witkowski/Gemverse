<template>
  <v-form @submit.prevent>
    <v-container>
      <v-row>
        <v-col cols="15">
          <v-text-field
            :append-outer-icon="'send'"
            color="primary"
            clearable
            clear-icon="cancel"
            @click:append-outer="sendMessage"
            :error-messages="inputError"
            label="Message"
            :rules="messageRules"
            outlined
            v-model="message"
            v-on:keyup="inputError = ''"
            v-on:keyup.enter="sendMessage"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import * as io from 'socket.io-client';

export default {
  data() {
    return {
      isFormValid: false,
      inputError: '',
      message: '',
      messageRules: [
        (value) => (value.length <= 4000) || 'Message must be less or equal to 4000 characters',
      ],
      socket: io('http://localhost:3000'),
    };
  },

  computed: {
    ...mapGetters(['getCurrentRoom', 'getUserInfo']),
  },

  methods: {
    sendMessage() {
      axios.post('http://localhost:3000/api/messages', {
        message: this.message,
        room: this.getCurrentRoom,
        user: this.getUserInfo,
      })
        .then((response) => {
          if (response.status === 201) {
            this.socket.emit('sendMessage',
              this.message,
              this.getUserInfo);
          }
          this.message = '';
        })
        .catch((error) => {
          console.log(error);
          this.inputError = error.response.data.error;
        });
    },
  },
};
</script>
