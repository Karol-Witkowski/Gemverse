<template>
  <v-main>
    <v-row
      align="center"
      justify="space-around"
    >
      <v-btn
        class="mt-4"
        color="primary"
        small
        to="/roomlist"
        outlined
      >
        Leave room
      </v-btn>
    </v-row>
    <ChatMessages />
    <ChatSideMenu />
    <ChatInput />
  </v-main>
</template>

<script>
import ChatMessages from '@/components/chat/ChatMessages.vue';
import ChatInput from '@/components/chat/ChatInput.vue';
import ChatSideMenu from '@/components/chat/ChatSideMenu.vue';

export default {
  name: 'Room',
  components: {
    ChatMessages,
    ChatInput,
    ChatSideMenu,
  },
};
</script>
