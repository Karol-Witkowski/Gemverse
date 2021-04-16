<template>
  <v-container
    class="mt-16 pt-16"
    fluid
  >
    <v-flex class="mx-auto xs11">
      <v-card
        class="mx-auto"
        max-width="500"
      >
        <v-card-title class="pb-1">
          <span class="font-weight-bold grey--text mx-auto subtitle-1 text--darken-2">
            {{ getUserInfo.username }}
          </span>
        </v-card-title>
        <v-list-item class="mx-auto">
          <v-list-item-avatar class="mx-auto">
            <img
              alt="user avatar"
              height="25"
              :src="`data:image/svg+xml;utf8,${generateAvatar(getUserInfo.username)}`"
            />
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item class="mt-6">
          <v-list-item-content>
            <v-list class="grey--text subtitle-1 text--darken-2">
              Email address: <span class="font-weight-bold">{{ getUserInfo.email }}</span>
            </v-list>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="mt-0">
          <v-list-item-content>
            <v-list class="grey--text subtitle-1 text--darken-2">
              Member since:
              <span class="font-weight-bold">
                {{ humanizeCreationDate(this.getUserInfo.createdDate) }}
              </span>
            </v-list>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="mt-16">
          <v-list-item-content>
            <v-card-actions>
              <v-btn
                @click="console.log(holder)"
                class="mx-auto"
                color="secondary"
                outlined
                small
                target="_blank"
              >
                delete account*
              </v-btn>
            </v-card-actions>
            <v-list-item class="deleteInfo">
              *Your personal data will be deleted,
              although all messages will be displayed
              (without the user data)
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import dayjs from 'dayjs';
import { generateFromString } from 'generate-avatar';
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters(['getUserInfo']),
  },

  methods: {
    generateAvatar(username) {
      return generateFromString(username);
    },

    humanizeCreationDate(creationDate) {
      return dayjs(creationDate).format('dddd, MMMM D YYYY');
    },
  },
};
</script>

<style lang="scss">
.deleteInfo {
  text-align: justify;
  text-justify: inter-word;
  word-break: normal;
}
</style>
