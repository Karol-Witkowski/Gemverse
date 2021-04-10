<template>
  <v-main class="mb-4 pl-0 pt-4">
    <div
      class="chat m-0 overflow-x-auto"
      v-chat-scroll
    >
      <li
        class="m-4 p-4 bg-white"
        :key="message._id"
        v-for="message in messages"
      >
        <v-list-item :key="message._id">
          <v-list-item-avatar class="my-0 py-0">
            <img
              class="userAvatar"
              :src="`data:image/svg+xml;utf8,${generateAvatar(message.user.username)}`"
            />
          </v-list-item-avatar>
          <v-list-item-content class="py-0">
            <v-list-item-title class="mt-2">
              <h5>{{ message.user.username }}</h5>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ message.message }}
              <v-spacer />
              <span class="font-weight-bold messageTime mt-3">
                {{ message.createdDate
                  .split('T')
                  .join(' ')
                  .slice(0, 16)
                }}
                CEST
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </li>
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
  height: 68vh!important;
}

.messageTime {
  float: right;
  font-size: 10px!important;
}

.scrollBar {
  max-height: 31em!important;
}

.userAvatar {
  height: 31.5px!important;
  margin-top: -8px!important;
  width: 31.5px!important;
}

.v-list-item__content {
  align-items: initial;
  padding: 0!important;
  margin: 0!important;
}

.v-list:last-of-type > hr {
  display: none;
}

.v-list-item__avatar:first-child {
  margin-right: 7px!important;
}
</style>
