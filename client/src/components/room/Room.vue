<template>
  <v-main>
    <v-btn
      class="alignBtn mr-6 mt-4"
      color="blue lighten-2"
      to="/roomlist"
      outlined
    >
      Leave room
    </v-btn>
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
<style lang="scss">
.alignBtn {
  float: right;
}
</style>
