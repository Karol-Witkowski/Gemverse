<template>
  <v-main>
    <v-row
      align="center"
      justify="space-around"
    >
      <v-btn
        class="mb-4 mt-4"
        color="blue lighten-2"
        small
        to="/roomlist"
        outlined
      >
        Leave room
      </v-btn>
    </v-row>
    <ChatMessages />
    <ChatInput />
  </v-main>
</template>

<script>
import ChatMessages from '@/components/chat/ChatMessages.vue';
import ChatInput from '@/components/chat/ChatInput.vue';

export default {
  name: 'Room',
  components: {
    ChatMessages,
    ChatInput,
  },
};
</script>
