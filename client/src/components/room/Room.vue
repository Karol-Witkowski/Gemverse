<template>
  <v-main>
    <v-row
      align="center"
      justify="space-around"
    >
      <v-btn
        class="mt-4"
        @click="leaveRoom"
        color="primary"
        small
        to="/roomlist"
        outlined
      >
        Leave room
      </v-btn>
    </v-row>
    <ChatMessages :messages="messages" />
    <ChatSideMenu :activeUsers="activeUsers" />
    <ChatInput />
  </v-main>
</template>

<script>
import ChatMessages from '@/components/chat/ChatMessages.vue';
import ChatInput from '@/components/chat/ChatInput.vue';
import ChatSideMenu from '@/components/chat/ChatSideMenu.vue';

import axios from 'axios';
import { mapGetters } from 'vuex';
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
      activeUsers: [],
      messages: {},
      socket: io('http://localhost:3000'),
    };
  },

  created() {
    this.getRoomData();
  },

  computed: {
    ...mapGetters(['getCurrentRoom', 'getUserInfo']),
  },

  methods: {
    getRoomData() {
      axios.get(`http://localhost:3000/api/room/${this.$route.params.slug}`)
        .then((response) => {
          this.$store.dispatch('saveCurrentRoom', response.data);
          this.socket.emit('joinRoom', {
            room: this.getCurrentRoom,
            user: this.getUserInfo,
          });
          this.socket.on('updateActiveUsers', (data) => {
            this.activeUsers = JSON.parse(data).activeUsers;
          });
          this.socket.on('updateMessages', (message) => {
            this.messages.push(JSON.parse(message));
          });
          this.socket.on('updateRoom', (data) => {
            const parsedData = data;
            if (parsedData.messages) {
              this.messages = parsedData.messages;
            }
            if (parsedData.room) {
              this.room = parsedData.room;
              this.activeUsers = parsedData.room.activeUsers;
              this.$store.dispatch('saveCurrentRoom', parsedData.room);
            }
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
    leaveRoom() {
      this.socket.emit('leaveRoom', this.getCurrentRoom);
    },
  },
};
</script>
