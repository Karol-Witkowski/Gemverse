<template>
    <v-navigation-drawer
      app
      :mini-variant.sync="mini"
      permanent
      v-model="drawer"
    >
      <v-list-item class="ma-1 px-1">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/27.jpg" />
        </v-list-item-avatar>
        <v-list-item-title>Jane Doe</v-list-item-title>
        <v-btn
          @click.stop="mini = !mini"
          color="blue lighten-3"
          elevation="1"
          icon
          text
          outlined
        >
          X
        </v-btn>
      </v-list-item>
      <v-divider />
      <v-container v-if="!mini">
        <v-list-item-title class="ml-2 mt-1 pl-16 text-uppercase">Users list</v-list-item-title>
        <v-list>
          <v-list-item
            :key="user.name"
            v-for="user in users"
          >
            <v-list-item-content>
              <v-avatar size="55">
                <v-img
                  :src="user.avatar"
                  max-width="55"
                />
              </v-avatar>
              <v-list-item-title class="ml-3 mt-1 pl-16">{{ user.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SideMenu',
  data() {
    return {
      drawer: true,
      users: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          name: 'User1',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          name: 'User2',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          name: 'User3',
        },
      ],
      mini: true,
    };
  },
};
</script>
