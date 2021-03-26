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
            label="Message"
            type="text"
            outlined
            v-model="message"
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
      message: '',
    };
  },

  computed: {
    ...mapGetters(['getUserInfo']),
  },

  methods: {
    sendMessage() {
      axios.post('http://localhost:3000/api/messages', {
        message: this.message,
        user: this.getUserInfo.username,
      })
        .then((response) => {
          if (response.status === 201) {
            this.socket.emit('newMessage',
              this.message,
              this.getUserInfo.username);
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
