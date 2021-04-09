<template>
  <v-main class="mb-4 pl-0 pt-4">
    <v-list
      class="overflow-y-auto py-1"
      color="rgb(248, 248, 248)"
      :key="message._id"
      v-for="(message) in messages"
    >
      <v-list-item
        :class="[
          'd-flex flex-row align-center my-2 message',
          message.user.username == message.message ?'justify-end': null
        ]"
        :key="message._id"
      >
        <v-list-item-avatar class="my-0 py-0">
          <img
            class="userAvatar"
            :src="`data:image/svg+xml;utf8,${generateAvatar(message.user.username)}`"
          />
        </v-list-item-avatar>
        <v-list-item-content class="py-0">
          <v-list-item-title class="m-0">
            <h5>{{ message.user.username }}</h5>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ message.message }}
            <v-spacer />
            <span class="font-weight-bold messageTime mt-3">
              {{ message.createdDate.split('T').join(' ').slice(0, 16) }} CEST
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    <v-divider class="msgDivider" />
    </v-list>
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
  data() {
    return {
      drawerToggle: false,
    };
  },

  created() {
    this.scrollToEnd();
  },

  computed: {
    ...mapGetters(['getCurrentRoom']),
  },

  methods: {
    generateAvatar(username) {
      return generateFromString(username);
    },

    scrollToEnd() {
      this.$nextTick(() => {
        const container = this.querySelector('.message')
        container.scrollTop = container.scrollHeight
      })
    },
  },
};
</script>
<style lang="scss">
.userAvatar {
  height: 31.5px!important;
  width: 31.5px!important;
}

.message {
  //
}

.messageTime {
  float: right;
  font-size: 10px!important;
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
