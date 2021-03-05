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
    <SideMenu />
    <ChatInput />
  </v-main>
</template>

<script>
import ChatMessages from '@/components/chat/ChatMessages.vue';
import ChatInput from '@/components/chat/ChatInput.vue';
import SideMenu from '@/components/layout/SideMenu.vue';

export default {
  name: 'Room',
  components: {
    ChatMessages,
    ChatInput,
    SideMenu,
  },
};
</script>
