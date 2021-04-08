<template>
  <v-navigation-drawer
    app
    :mini-variant.sync="drawer"
    permanent
    width="170"
  >
    <v-list-item class="ma-1 px-1">
      <v-list-item-avatar>
        <img
          class="avatars"
          :src="`data:image/svg+xml;utf8,${generateAvatar(getUserInfo.username)}`"
        />
      </v-list-item-avatar>
      <v-list-item-title class="font-weight-medium userName">
        {{ getUserInfo.username }}
      </v-list-item-title>
    </v-list-item>
    <v-divider />
    <v-layout>
      <v-spacer />
      <v-btn
        @click="drawer = !drawer"
        color="primary"
        rounded
        v-if="!drawer"
        x-small
      >
        <v-icon>cancel</v-icon>
      </v-btn>
    </v-layout>
    <v-container v-if="!drawer">
      <v-list-item-title class="ml-7 mt-1 text-uppercase">users list</v-list-item-title>
      <v-list>
        <v-list-item
          :key="user.lookup._id"
          v-for="user in activeUsers"
        >
          <v-list-item-content>
            <v-avatar>
              <img
                class="avatars"
                :src="`data:image/svg+xml;utf8,${generateAvatar(user.lookup.username)}`"
              />
            </v-avatar>
            <v-list-item-title class="mb-3 ml-10 mt-1 userName">
              {{ user.lookup.username }}
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
  margin-left: -10px;
}

.avatars {
  height: 35px!important;
  width: 35px!important;
}
</style>
