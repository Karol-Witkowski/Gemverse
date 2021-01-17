<template>
  <v-main>
    <ChatBox />
    <ChatInput />
  </v-main>
</template>

<script>
import ChatBox from '@/components/ChatBox.vue';
import ChatInput from '@/components/ChatInput.vue';

export default {
  name: 'Chat',
  components: {
    ChatBox,
    ChatInput,
  },
};
</script>
