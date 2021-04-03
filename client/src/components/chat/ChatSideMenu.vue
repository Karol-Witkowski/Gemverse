<template>
  <v-navigation-drawer
    app
    :mini-variant.sync="drawer"
    permanent
    width="170"
  >
    <v-list-item class="ma-1 px-1">
      <v-list-item-avatar>
        <img :src="`data:image/svg+xml;utf8,${generateAvatar(getUserInfo.username)}`" />
      </v-list-item-avatar>
      <v-list-item-title class="userName">{{ getUserInfo.username }}</v-list-item-title>
    </v-list-item>
    <v-divider />
    <v-layout>
      <v-spacer />
      <v-btn
        @click="drawer = !drawer"
        color="primary"
        icon
        small
        v-if="!drawer"
      >
        <v-icon>cancel</v-icon>
      </v-btn>
    </v-layout>
    <v-container v-if="!drawer">
      <v-list-item-title class="ml-7 mt-1 text-uppercase">Users list</v-list-item-title>
      <v-list>
        <v-list-item
          :key="user.username"
          v-for="user in activeUsers"
        >
          <v-list-item-content>
            <v-avatar>
              <img :src="`data:image/svg+xml;utf8,${generateAvatar(user.username)}`" />
            </v-avatar>
            <v-list-item-title class="mb-3 ml-10 mt-1 userName">
              {{ user.username }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { generateFromString } from 'generate-avatar';
import { mapGetters } from 'vuex';

export default {
  name: 'ChatSideMenu',
  props: {
    activeUsers: {},
  },
  data() {
    return {
      drawer: true,
    };
  },

  computed: {
    ...mapGetters(['getUserInfo']),
  },

  methods: {
    generateAvatar(username) {
      return generateFromString(username);
    },
  },
};
</script>
<style lang="scss">
.userName {
  font-size: 12px;
  font-weight: 550;
  margin-left: -10px;
}
</style>
