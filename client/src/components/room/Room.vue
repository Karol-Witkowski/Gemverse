<template>
  <v-main>
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
