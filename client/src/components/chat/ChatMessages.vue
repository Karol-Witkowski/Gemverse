<template>
  <v-main class="mb-4 pl-0 pt-4">
    <v-list
      class="scrollBar overflow-y-auto"
      color="rgb(248, 248, 248)"
      :key="message._id"
      three-line
      v-for="message in messages"
    >
      <template>
        <v-list-item :key="message._id">
          <v-list-item-avatar>
            AVA
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ message.user.username }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ message.message }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider />
    </v-list>
  </v-main>
</template>

<script>
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
};
</script>
<style lang="scss">
.scrollBar {
  max-height: 31em;
}
</style>
