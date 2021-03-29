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
    <ChatMessages :messages="messages"/>
    <ChatSideMenu />
    <ChatInput />
  </v-main>
</template>

<script>
import ChatMessages from '@/components/chat/ChatMessages.vue';
import ChatInput from '@/components/chat/ChatInput.vue';
import ChatSideMenu from '@/components/chat/ChatSideMenu.vue';

import axios from 'axios';
import * as io from 'socket.io-client';

export default {
  name: 'Room',
  components: {
    ChatMessages,
    ChatInput,
    ChatSideMenu,
  },
  data() {
    return {
      messages: {},
      socket: io('http://localhost:3000'),
    };
  },

  created() {
    this.getRoomData();
    this.socket.on('updateMessages', (data) => {
      this.messages.push({
        message: data.message,
        room: data.room,
        user: data.user,
      });
    });
  },

  methods: {
    getMessages(roomId) {
      axios.get(`http://localhost:3000/api/messages/${roomId}`)
        .then((response) => {
          this.messages = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getRoomData() {
      axios.get(`http://localhost:3000/api/room/${this.$route.params.slug}`)
        .then((response) => {
          // eslint-disable-next-line no-underscore-dangle
          this.getMessages(response.data._id);
          this.$store.dispatch('saveCurrentRoom', response.data);
          this.socket.emit('joinRoom', {
            message: `User ${this.getUserInfo.username} connected to ${this.getCurrentRoom.name}`,
            room: this.getCurrentInfo,
            user: this.getUserData,
          });
        })
        .catch((error) => {
          if (error.status === 404) {
            this.$router.push({
              name: 'RoomList',
              params: { message: 'Room not found' },
            });
          }
        });
    },
  },
};
</script>
