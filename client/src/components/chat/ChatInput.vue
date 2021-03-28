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

export default {
  data() {
    return {
      isFormValid: false,
      inputError: '',
      message: '',
      messageRules: [
        (value) => (value.length <= 4000) || 'Message must be less or equal to 4000 characters',
      ],
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
          this.message = '';
          if (response.status === 200) {
            /* this.socket.emit('newMessage',
              this.message,
              this.getUserInfo); */
          }
        })
        .catch((error) => {
          console.log(error);
          this.inputError = error.response.data.error;
        });
    },
  },
};
</script>
