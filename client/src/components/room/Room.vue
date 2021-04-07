<template>
  <v-main>
    <v-row
      align="center"
      justify="space-around"
    >
      <v-btn
        class="mt-4"
        color="primary"
        outlined
        small
        to="/roomlist"
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
    ChatInput,
    ChatMessages,
    ChatSideMenu,
  },
  data() {
    return {
      activeUsers: {},
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
            if (data.activeUsers) {
              this.activeUsers = JSON.parse(data).activeUsers;
            }
          });
          this.socket.on('updateMessages', (data) => {
            this.messages.push(JSON.parse(data));
          });
          this.socket.on('updateRoom', (data) => {
            if (data.messages) {
              this.messages = data.messages;
            }
            if (data.room) {
              this.room = data.room;
              this.activeUsers = this.room.activeUsers;
              this.$store.dispatch('saveCurrentRoom', this.room);
            }
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.status === 404) { // DISPLAY ON LIST
            this.$router.push({
              name: 'RoomList',
              params: { message: 'Room not found' },
            });
          }
        });
    },

    leaveRoom() {
      // eslint-disable-next-line no-underscore-dangle
      axios.post('http://localhost:3000/api/room/remove/online/user', { id: this.getCurrentRoom._id })
        .then((response) => {
          this.socket.emit('leaveRoom', {
            // eslint-disable-next-line no-underscore-dangle
            room: response.data,
            user: null,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      this.socket.removeListener('joinRoom');
    },
  },

  beforeDestroy() {
    this.leaveRoom();
  },
};
</script>
