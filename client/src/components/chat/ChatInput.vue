<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            :append-outer-icon="'send'"
            color="primary"
            clearable
            clear-icon="cancel"
            @click:append-outer="sendMessage"
            :error-messages="error"
            label="Message"
            type="text"
            outlined
            v-model="message"
            v-on:keyup="error = ''"
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
      error: '',
      message: '',
      messageData: {
        message: this.message,
        room: this.getCurrentRoom,
        user: this.getUserInfo,
      },
    };
  },

  computed: {
    ...mapGetters(['getCurrentRoom', 'getUserInfo']),
  },

  methods: {
    sendMessage() {
      axios.post('http://localhost:3000/api/messages', this.messageData)
        .then((response) => {
          if (response.status === 201) {
            this.socket.emit('newMessage', this.messageData);
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
        });
    },
  },
};
</script>
