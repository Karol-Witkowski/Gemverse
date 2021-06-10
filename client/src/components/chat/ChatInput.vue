<template>
  <v-form
    @submit.prevent
    v-model="isFormValid"
  >
    <v-container>
      <v-row>
        <v-col cols="15">
          <v-text-field
            :append-outer-icon="'send'"
            class="input"
            clearable
            clear-icon="cancel"
            @click:append-outer="sendMessage"
            color="primary"
            dense
            :error-messages="inputError"
            label="Message"
            name="message"
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
import io from 'socket.io-client';

export default {
  name: 'ChatInput',
  data() {
    return {
      inputError: '',
      isFormValid: false,
      message: '',
      socket: io('https://gemverse.herokuapp.com'),
    };
  },

  computed: {
    ...mapGetters(['getCurrentRoom', 'getUserInfo']),
  },

  methods: {
    sendMessage() {
      axios.post(`https://gemverse.herokuapp.com/api/messages/${this.getCurrentRoom.slug}`, {
        message: this.message,
        room: this.getCurrentRoom._id,
        user: this.getUserInfo._id,
      })
        .then((response) => {
          if (response.status === 201) {
            this.socket.emit('sendMessage', response.data.data);
            this.message = '';
          }
        })
        .catch((error) => {
          this.inputError = error.response.data.errors.message.msg;
        });
    },
  },
};
</script>

<style lang="scss">
.v-input__icon {
  font-size: 1.5em!important;
}
</style>
