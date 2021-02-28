<template>
  <v-card  cols="12">
    <v-card-title>
      <span class="headline grey--text text--darken-2">Type password to proceed</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form v-model="isFormValid">
          <v-col cols="12">
            <v-text-field
              label="Room password"
              required
              :rules="rules"
              type="password"
              v-model="roomPassword"
              v-on:keyup.enter="passwordValidation()"
            />
          </v-col>
        </v-form>
        <span v-if="error">{{ error }}</span>
      </v-container>
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
        @click.prevent="passwordValidation()"
        color="primary"
        :disabled="!isFormValid"
        text
        type="submit"
        outlined
      >
        Enter
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PrivateRoomModal',
  data() {
    return {
      error: '',
      isFormValid: false,
      roomPassword: '',
      rules: [
        (value) => value.length <= 128 || 'Given string must be less or equal to 128 characters',
        (value) => !!value || 'Required',
      ],
    };
  },
  props: {
    privateRoomName: String,
  },

  methods: {
    passwordVerification() {
      axios.post('/api/room/verification', {
        name: this.privateRoomName,
        password: this.roomPassword,
      })
        .then((response) => {
          if (response.data.errors) {
            this.error = response.data.errors;
            this.password = '';
          } else if (response.data.success) {
            this.join(this.privateRoomName);
          }
          setTimeout(() => {
            this.error = [];
          }, 1500);
        })
        .catch((error) => console.log(error));
    },

    closeModal() {
      this.password = '';
      this.$emit('close-modal');
    },

    join(roomName) {
      this.$router.push({
        name: 'Room',
        params: { name: roomName },
      });
    },

    passwordValidation() {
      if (this.isFormValid) {
        this.closeModal();
      }
    },
  },
};
</script>
