<template>
  <v-card  cols="12">
    <v-card-title>
      <span class="headline grey--text text--darken-2">Type password to proceed</span>
    </v-card-title>
    <v-card-text>
      <v-form
        type="submit"
        onSubmit="return false"
        v-model="isFormValid"
      >
        <v-col cols="12">
          <v-text-field
            label="Room password"
            required
            :rules="rules"
            type="password"
            v-model="privateRoomPassword"
            v-on:keyup.enter="passwordValidation()"
          />
        </v-col>
      </v-form>
      <span v-if="error">{{ error }}</span>
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
      privateRoomPassword: '',
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
      axios.post('/api/room/verify', {
        name: this.privateRoomName,
        password: this.privateRoomName,
      })
        .then((response) => {
          if (response.data.errors) {
            console.log('error z ifa');
          } else if (response.data.success) {
            this.join(this.privateRoomName);
          }
        })
        .catch((error) => console.log(error));
    },

    closeModal() {
      this.$emit('close-modal');
      this.privateRoomPassword = '';
    },

    join(roomName) {
      this.$router.push({
        name: 'Room',
        params: { name: roomName },
      });
    },

    passwordValidation() {
      if (this.isFormValid) {
        this.passwordVerification();
        this.closeModal();
      }
    },
  },
};
</script>
