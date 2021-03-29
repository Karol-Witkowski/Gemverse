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
      this.socket.emit('sendMessage', {
        message: this.message,
        room: this.getCurrentRoom,
        user: this.getUserInfo,
      });
      this.message = '';
    },
  },
};
</script>
