<template>
  <v-main class="mb-4 pl-4 pt-2">
    <div
      class="chat ma-0 overflow-x-auto"
      v-chat-scroll="{
        smooth: true,
        notSmoothOnInit: true,
      }"
    >
      <v-list class="bg-white" :key="message._id" v-for="message in messages">
        <v-list-item-avatar class="ml-1 mt-1">
          <img
            alt="user avatar"
            :src="`data:image/svg+xml;utf8,
            ${generateAvatar(message.user ? message.user.username : anonymous)}`"
          />
        </v-list-item-avatar>
        <span class="font-weight-bold">
          {{ message.user ? message.user.username : anonymous }}
        </span>
        <v-list-item class="pl-3" :key="message._id">
          <v-list-item-content class="py-0">
            <v-list class="pl-1 pr-4 userMessage">
              {{ message.message }}
              <v-spacer />
              <span class="font-weight-medium messageTime mt-3">
                {{ utcToRelative(message.createdDate) }}
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
import dayjs from "dayjs";
import { generateFromString } from "generate-avatar";

const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

export default {
  name: "ChatMessages",
  props: {
    messages: {},
  },

  computed: {
    anonymous() {
      return "Anonymous_".concat(Math.random() * 100).substring(0, 14);
    },
  },

  methods: {
    generateAvatar(username) {
      return generateFromString(username);
    },

    utcToRelative(message) {
      return dayjs(message).fromNow();
    },
  },
};
</script>

<style lang="scss">
.chat {
  height: 75.3vh;
}

.v-list-item__avatar:first-child {
  height: 28px !important;
  margin-right: 7px !important;
  margin-top: -8px;
  width: 28px !important;
}

.userMessage {
  display: block;
  font-size: 1.14em !important;
  text-align: justify;
  text-justify: inter-word;
  word-break: normal;
}

.messageTime {
  float: right;
  font-size: 0.86em !important;
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
