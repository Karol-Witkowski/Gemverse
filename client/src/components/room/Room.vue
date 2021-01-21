<template>
  <v-main>
    <ChatBox />
    <ChatInput />
  </v-main>
</template>

<script>
import ChatBox from '@/components/chat/ChatBox.vue';
import ChatInput from '@/components/chat/ChatInput.vue';

export default {
  name: 'Room',
  components: {
    ChatBox,
    ChatInput,
  },
};
</script>
