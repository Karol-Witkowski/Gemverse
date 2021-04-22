<template>
  <v-form @submit.prevent>
    <v-container>
      <v-row>
        <v-col cols="15">
          <v-text-field
            :append-outer-icon="'send'"
            class="input"
            color="primary"
            clearable
            clear-icon="cancel"
            @click:append-outer="sendMessage"
            dense
            :error-messages="inputError"
            label="Message"
            outlined
            :rules="messageRules"
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
      inputError: '',
      isFormValid: false,
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
        // eslint-disable-next-line no-underscore-dangle
        room: this.getCurrentRoom._id,
        // eslint-disable-next-line no-underscore-dangle
        user: this.getUserInfo._id,
      });
      this.message = '';
    },
  },
};
</script>

<style lang="scss">
.v-input__icon {
  font-size: 1.5em!important;
}
</style>
