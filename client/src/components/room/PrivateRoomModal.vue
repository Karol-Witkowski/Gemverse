<template>
  <v-card cols="12">
    <v-card-title class="header headline grey--text text--darken-2">
      Type password to proceed
    </v-card-title>
    <v-card-text>
      <v-form
        onSubmit="return false"
        ref="form"
        type="submit"
        v-model="isFormValid"
      >
        <v-col cols="12">
          <v-text-field
            :error-messages="error"
            label="Room password"
            name="password"
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
        name="close"
        outlined
        text
      >
        close
      </v-btn>
      <v-spacer />
      <v-btn
        @click.prevent="passwordValidation"
        color="primary"
        :disabled="!isFormValid"
        name="enter"
        outlined
        text
        type="submit"
      >
        enter
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

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

  computed: {
    ...mapGetters(['getCurrentRoom']),
  },

  methods: {
    closeModal() {
      this.$emit('closeModal');
      this.error = '';
      this.privateRoomPassword = '';
      this.$refs.form.resetValidation();
    },

    passwordVerification() {
      axios.post('http://localhost:3000/api/room/verification', {
        name: this.getCurrentRoom.name,
        password: this.privateRoomPassword,
      })
        .then((response) => {
          if (response.data.data.slug) {
            this.join(response.data.data.slug);
          }
        })
        .catch((error) => {
          this.error = error.response.data.message;
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

<style lang="scss">
.header {
  text-align: justify;
  text-justify: inter-word;
  word-break: normal;
}
</style>
