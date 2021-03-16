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
export default {
  data() {
    return {
      message: '',
    };
  },

  methods: {
    sendMessage() {
      this.message = '';
    },
  },
};
</script>
