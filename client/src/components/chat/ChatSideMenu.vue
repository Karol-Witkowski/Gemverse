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
      <v-list-item-title class="font-weight-medium ml-1 userName">
        {{ getUserInfo.username }}
      </v-list-item-title>
    </v-list-item>
    <div
      align="center"
      v-if="!drawer"
    >
    <v-divider />
      <v-btn
        block
        @click="drawer = !drawer"
        elevation="0"
        v-if="!drawer"
        x-small
      >
        close
      </v-btn>
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
                class="avatars"
                :src="`data:image/svg+xml;utf8,${generateAvatar(user.lookup.username)}`"
              />
            </v-avatar>
            <v-list-item-title class="mb-3 ml-1 mt-1 userName">
              {{ user.lookup.username }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
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
