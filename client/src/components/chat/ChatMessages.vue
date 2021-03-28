<template>
  <v-main class="mb-4 pl-0 pt-4">
    <v-list
      class="scrollBar overflow-y-auto"
      color="rgb(248, 248, 248)"
      :key="message._id"
      three-line
      v-for="message in messages"
    >
        <v-list-item :key="message._id">
          <v-list-item-avatar class="py-0 my-0">
            <img :src="`data:image/svg+xml;utf8,${generateAvatar(message.user._id)}`" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
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
    generateAvatar(id) {
      return generateFromString(id);
    },
  },
};
</script>
<style lang="scss">
.v-list-item__content {
  align-items: initial;
  padding-top: 0px;
}

.v-list:last-of-type > hr {
  display: none;
}

.scrollBar {
  max-height: 31em;
}
</style>
