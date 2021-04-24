<template>
  <v-main>
    <ChatMessages :messages="messages" />
    <ChatSideMenu
      :activeUsers="activeUsers"
      class="float-left ml-4 mt-6"
    />
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
          this.$store.dispatch('saveCurrentRoom', response.data.room);
          this.socket.on('removeRoomFromList', (slug) => {
            if (this.$route.path === `/room/${slug}`) {
              this.$router.push({
                name: 'RoomList',
                params: { message: 'Room has been deleted' },
              });
            }
          });

          this.socket.emit('joinRoom', {
            room: this.getCurrentRoom,
            user: this.getUserInfo,
          });

          this.socket.on('userDisconnected', (data) => {
            this.activeUsers = data.updated.activeUsers;
          });

          this.socket.on('userMoved', (data) => {
            this.activeUsers = data.activeUsers;
          });

          this.socket.on('updateMessages', (data) => {
            this.messages.push(JSON.parse(data));
          });

          this.socket.on('updateRoom', (data) => {
            if (data.messages) {
              this.messages = data.messages;
            }
            if (data.room) {
              this.activeUsers = data.room.activeUsers;
              this.$store.dispatch('saveCurrentRoom', data.room);
            }
          });
        })
        .catch((error) => {
          console.log(error);
          this.$router.push({
            name: 'RoomList',
            params: { message: error.response.data.error },
          });
        });
    },

    leaveRoom() {
      // eslint-disable-next-line no-underscore-dangle
      axios.post('http://localhost:3000/api/room/remove/user', { slug: this.getCurrentRoom.slug })
        .then((response) => {
          this.socket.emit('leaveRoom', response.data.room);
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
