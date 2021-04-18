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
              :src="`data:image/svg+xml;utf8,${generateAvatar(getUserInfo.username)}`"
            />
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="mb-0 pb-0">
            <v-list class="d-flex grey--text justify-center subtitle-1 text--darken-2">
              Email address:
              <span class="font-weight-bold pl-1">
                {{ getUserInfo.email }}
              </span>
            </v-list>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content >
            <v-list class="d-flex grey--text justify-center subtitle-1 text--darken-2">
              Member since:
              <span class="font-weight-bold pl-1">
                {{ showCreationDate(this.getUserInfo.createdDate) }}
              </span>
            </v-list>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-action>
                <v-dialog
                  max-width="600"
                  overlay-opacity="0.15"
                  persistent
                  :retain-focus="false"
                  v-model="deleteUserModal"
                >
                  <template
                    class="mb-16"
                    v-slot:activator="{ on, attrs }"
                  >
                    <v-btn
                      class="mb-2 mx-auto"
                      color="secondary"
                      outlined
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      delete account*
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline grey--text text--darken-2">
                      Delete user account
                    </v-card-title>
                    <v-card-text>
                      Click "OK" to delete account. Removed account cannot be restored.
                    </v-card-text>
                    <v-card-text
                      class="errorMessage"
                      v-if="deleteError"
                    >
                      {{ deleteError }}
                    </v-card-text>
                    <v-divider />
                    <v-card-actions>
                      <v-btn
                        @click="closeModals"
                        color="primary"
                        outlined
                        text
                      >
                        close
                      </v-btn>
                      <v-spacer />
                      <v-btn
                        @click="deleteUser()"
                        color="primary"
                        outlined
                        text
                      >
                        ok
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item-action>
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
import axios from 'axios';
import dayjs from 'dayjs';
import { generateFromString } from 'generate-avatar';
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  data() {
    return {
      deleteError: '',
      deleteRoomModal: false,
      deleteUserModal: false,
      errors: [],
    };
  },

  methods: {
    closeModals() {
      this.deleteError = '';
      this.deleteUserModal = false;
    },

    deleteUser() {
      axios.put('http://localhost:3000/api/user/remove/logged', this.getUserInfo)
        .then(() => {
          this.$store.dispatch('resetState', true);
          localStorage.clear();
          this.$router.push({
            name: 'Login',
            params: { message: 'Account deleted' },
          });
        })
        .catch((error) => {
          console.log(error);
          this.deleteError = error.response.data.error;
        });
    },

    generateAvatar(username) {
      return generateFromString(username);
    },

    showCreationDate(creationDate) {
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

.errorMessage {
  color: rgb(194, 57, 57)!important;
}

.userAvatar {
  height: 60px!important;
  width: 60px!important;
}
</style>
