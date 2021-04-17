<template>
  <div>
    <v-btn
      class="ml-2"
      @click="drawer = !drawer"
      justify="left"
      color="primary"
      v-ripple="{ center: true }"
      x-small
    >
      panel
    </v-btn>
    <v-navigation-drawer
      app
      pernament
      width="170"
      v-model="drawer"
    >
      <v-list-item class="mt-2 px-1">
        <v-list-item-avatar>
          <img
            alt="online user"
            :src="`data:image/svg+xml;utf8,${generateAvatar(getUserInfo.username)}`"
          />
        </v-list-item-avatar>
        <v-list-item-title class="body-2 font-weight-bold mb-3 userName">
          {{ getUserInfo.username }}
        </v-list-item-title>
      </v-list-item>
      <div align="center">
        <v-divider />
        <v-btn
          block
          elevation="0"
          to="/roomlist"
          x-small
        >
          leave room
        </v-btn>
      <v-divider />
        <v-list-item-title
          class="ax-auto mt-2 font-weight-bold text-uppercase"
        >
          users list
        </v-list-item-title>
        <v-list>
          <v-list-item
            :key="user.lookup._id"
            v-for="user in activeUsers"
          >
            <v-list-item-content>
              <v-avatar>
                <img
                  alt="online user avatar"
                  class="activeUsersAvatars"
                  :src="`data:image/svg+xml;utf8,${generateAvatar(user.lookup.username)}`"
                />
              </v-avatar>
              <v-list-item-title class="mb-3 ml-1 mt-1">
                {{ user.lookup.username }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
  </div>
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
      drawer: false,
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
  margin-left: -7px!important;
}

.activeUsersAvatars {
  height: 33px!important;
  width: 33px!important;
}
</style>
