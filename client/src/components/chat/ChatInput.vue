<template>
    <v-form cols='12'>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
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
          </v-col>
        </v-row>
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
