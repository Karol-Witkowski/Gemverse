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
            user: this.getUserData,
          });
          this.socket.on('updateRoom', (data) => {
            const roomMessages = JSON.parse(data.messages);
            if (roomMessages) {
              this.messages = roomMessages;
            }
          });

          this.getSocket.on('updateMessages', (message) => {
            this.messages.push(JSON.parse(message));
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
