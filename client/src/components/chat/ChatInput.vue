<template>
    <v-form cols='16'>
      <v-container>
        <v-text-field
          append-icon="➡️"
          clearable
          clear-icon="x"
          @click:clear="clearMessage"
          @enter:append-outer="sendMessage"
          filled
          label="Message"
          placeholder="Type message..."
          type="text"
          v-model="message"
        />
      </v-container>
    </v-form>
</template>

<script>
export default {
  name: 'ChatInput',
  data() {
    return {
      message: '',
    };
  },

  methods: {
    sendMessage() {
      this.resetIcon();
      this.clearMessage();
    },
    clearMessage() {
      this.message = '';
    },
  },
};
</script>
