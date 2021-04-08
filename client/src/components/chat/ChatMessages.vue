<template>
  <v-main class="mb-4 pl-0 pt-4">
    <v-list
      class="scrollBar overflow-y-auto py-1"
      color="rgb(248, 248, 248)"
      :key="message._id"
      three-line
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
          <v-list-item-title class="m-0">
            <h5>{{ message.user.username }}</h5>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ message.message }}
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
.userAvatar {
  height: 30px!important;
  width: 30px!important;
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

.scrollBar {
  max-height: 31em;
}
</style>
