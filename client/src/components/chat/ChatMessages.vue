<template>
  <v-main class="mb-4 pt-4 pl-0">
    <v-list
      class="scrollBar overflow-y-auto"
      color="rgb(248, 248, 248)"
      three-line
    >
      <template v-for="(item, index) in items">
        <v-divider
          class="msgDivider"
          :inset="item.inset"
          :key="index"
        />
        <v-list-item :key="item.username">
          <v-list-item-avatar>
            <v-img :src="item.avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.username" />
            <v-list-item-subtitle v-html="item.message" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-main>
</template>

<script>
export default {
  name: 'ChatMessages',
  data() {
    return {
      drawerToggle: false,
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          username: 'Ali Connors',
          message: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          username: 'Antonio Muaer',
          message: 'Wish I could come, but I\'m out of town this weekend.',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          username: 'Sandra Adams',
          message: 'Have you ever been?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          username: 'Ana Hansen',
          message: 'Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          username: 'Britta Holtt',
          message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          username: 'Britta Holt',
          message: 'Banana, chilli, kimchi and eggs, fells good.',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          username: 'Ana Hanseń',
          message: 'Gemverse is a chat app that keeps you connected with coworker and friends wherever you are. User can create own rooms or join to one already made. Gemverse is created by combining Vue, Vuetify, Express, Socket.io, MongoDB and more. The app aims to provide an alternative for friends to hang around and chat. The app is based on rooms - organized channels allow you to talk about programming, hobbies, games and more. Check my profile at GitHub.',
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.scrollBar {
  max-height: 31em;

  .msgDivider:first-of-type {
    display: none;
  }
}
</style>
