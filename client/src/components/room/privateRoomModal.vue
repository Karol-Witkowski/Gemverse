<template>
  <v-card  cols="12">
    <v-card-title>
      <span class="headline grey--text text--darken-2">Type password to proceed</span>
    </v-card-title>
    <v-card-text>
      <v-form
        type="submit"
        ref="form"
        onSubmit="return false"
        v-model="isFormValid"
      >
        <v-col cols="12">
          <v-text-field
            :error-messages="error"
            label="Room password"
            required
            :rules="rules"
            type="password"
            v-model="privateRoomPassword"
            v-on:keyup="error = ''"
            v-on:keyup.enter="passwordValidation"
          />
        </v-col>
      </v-form>
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
        @click.prevent="passwordValidation"
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

  methods: {
    closeModal() {
      this.$emit('close-modal');
      this.error = '';
      this.privateRoomPassword = '';
      this.$refs.form.resetValidation();
    },

    passwordVerification() {
      axios.post('http://localhost:3000/api/room/verification', {
        name: this.$store.state.privateRoomName,
        password: this.privateRoomPassword,
      })
        .then((response) => {
          if (response.data.slug) {
            this.join(response.data.slug);
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
        });
    },

    join(roomSlug) {
      this.$router.push({
        name: 'Room',
        params: { slug: roomSlug },
      });
    },

    passwordValidation() {
      if (this.isFormValid) {
        this.passwordVerification();
      }
    },
  },
};
</script>
