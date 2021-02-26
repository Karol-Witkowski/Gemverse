<template>
  <v-card  cols="12">
    <v-card-title>
      <span class="headline grey--text text--lighten-1">Type password to proceed</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form v-model="isFormValid">
          <v-col cols="12">
            <v-text-field
              label="Password"
              required
              :rules="passwordRules"
              type="password"
              v-model="password"
              v-on:keyup.enter="passwordValidation()"
            />
          </v-col>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions class="pb-4">
      <v-btn
        @click="closeModal"
        color="blue lighten-2"
        text
        outlined
      >
        Close
      </v-btn>
      <v-spacer />
      <v-btn
        @click.prevent="[passwordValidation()]"
        color="blue lighten-2"
        :disabled="!isFormValid"
        text
        type="submit"
        outlined
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddRoom',
  data() {
    return {
      error: [],
      isFormValid: false,
      password: '',
      passwordRules: [
        (value) => !!value || 'Required.',
        (value) => (value.length <= 128) || 'Maximum password length is 128 characters',
      ],
    };
  },

  methods: {
    checkPassword() {
      axios.post('http://localhost:3000/api/room', this.room)
        .then(() => {
        })
        .catch((e) => {
          // REMINDER Later add handle error message
          this.error.push(e);
        });
    },

    closeModal() {
      this.$emit('close-modal');
    },

    passwordValidation() {
      if (this.isFormValid) {
        this.closeModal();
      }
    },
  },
};
</script>
