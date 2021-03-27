<template>
  <v-main class="mb-4 pl-0 pt-4">
    <v-list
      class="scrollBar overflow-y-auto"
      color="rgb(248, 248, 248)"
      :key="message._id"
      three-line
      v-for="message in messages"
    >
      <template>
        <v-divider class="msgDivider" :key="message.user" />
        <v-list-item :key="message._id">
          <v-list-item-avatar>
            AVA
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ message.user }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ message.message }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider />
    </v-list>
  </v-main>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'ChatMessages',
  data() {
    return {
      drawerToggle: false,
      messages: {},
    };
  },

  created() {
    this.getMessages();
  },

  computed: {
    ...mapGetters(['getCurrentRoom']),
  },

  methods: {
    getMessages() {
      // eslint-disable-next-line no-underscore-dangle
      axios.get(`http://localhost:3000/api/messages/${this.getCurrentRoom._id}`)
        .then((response) => {
          this.messages = response.data;
          console.log(this.messages);
          /* this.socket.on('messages', (roomId) => {
          }); */
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss">
.scrollBar {
  max-height: 31em;

  .msgDivider:first-of-type {
    display: none;
  }
}
</style>
