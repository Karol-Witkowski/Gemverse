<template>
  <v-main class="mb-4 pl-0 pt-2">
    <div
      class="chat ma-0 overflow-x-auto"
      v-chat-scroll="{smooth: true, notSmoothOnInit: true}"
    >
      <v-list
        class="0 bg-white"
        :key="message._id"
        v-for="message in messages"
      >
        <v-list-item :key="message._id">
          <v-list-item-avatar>
            <img
              alt="user avatar"
              class="userAvatar"
              :src="`data:image/svg+xml;utf8,${generateAvatar(message.user.username)}`"
            />
          </v-list-item-avatar>
          <v-list-item-content class="py-0">
            <v-list-item-title class="mb-1 mt-2 pl-2">
              <h5>{{ message.user.username }}</h5>
            </v-list-item-title>
            <v-list class="pl-2 userMessage">
              {{ message.message }}
              <v-spacer />
              <span class="font-weight-bold messageTime mt-3">
                {{ message.createdDate
                  .split('T')
                  .join(' ')
                  .slice(0, 16)
                }}
                UTC
              </span>
            </v-list>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </v-list>
    </div>
  </v-main>
</template>

<script>
import { generateFromString } from 'generate-avatar';
import { mapGetters } from 'vuex';

export default {
  name: 'ChatMessages',
  props: {
    messages: {},
  },

  computed: {
    ...mapGetters(['getCurrentRoom']),
  },

  methods: {
    generateAvatar(username) {
      return generateFromString(username);
    },
  },
};
</script>
<style lang="scss">
.chat {
  height: 75.3vh;
}

.v-list-item__avatar:first-child {
  height: 31.5px!important;
  margin-right: 7px!important;
  margin-top: -8px;
  width: 31.5px!important;
}

.userMessage {
  text-align: justify;
  text-justify: inter-word;
  word-break: normal;
}

.messageTime {
  float: right;
  font-size: 10px!important;
}

.v-list-item__content {
  align-items: initial;
  padding: 0;
  margin: 0;
}

.v-list:last-of-type > hr {
  display: none;
}
</style>
