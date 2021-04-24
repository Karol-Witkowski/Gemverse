<template>
  <v-container
    class="mt-8"
    fluid
  >
    <v-flex
      centered
      class="sm12 mx-6"
    >
      <v-alert
        class="mt-5 mb-md-2 mx-auto pa-2"
        max-width="300"
        type="error"
        v-bind:class="[roomError ? 'roomErrorAlert' : 'whiteSpace']"
      >
        <v-row align="center">
          <v-col class="grow">
            <strong class="mx-auto">{{ roomError }}</strong>
          </v-col>
          <v-col class="shrink">
            <v-btn
              @click="showRoomError"
              small
            >
              ok
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
      <v-layout>
        <v-spacer />
        <v-btn
          @click="[toggleSort = !toggleSort, sort()]"
          color="primary"
          x-small
        >
          {{ sortBy }}
        </v-btn>
      </v-layout>
      <v-card class="mb-6">
        <v-card-title class="py-2">
          <span class="font-weight-bold grey--text subtitle-2 text--darken-2 text-uppercase">
            available rooms
          </span>
        </v-card-title>
        <v-divider />
        <transition-group name="list">
          <v-list
            class="list-item py-0 roomList"
            cols="12"
            :key="room._id"
            v-for="room in sortedRooms"
          >
            <v-list-item>
              <v-list-item-content class="roomName">{{ room.name }}</v-list-item-content>
              <v-list-item-action v-if="getUserInfo._id === room.user">
                <v-dialog
                  max-width="600"
                  overlay-opacity="0.15"
                  persistent
                  :retain-focus="false"
                  v-model="deleteRoomModal"
                >
                  <template
                    class="mb-16"
                    v-slot:activator="{ on, attrs }"
                  >
                    <v-btn
                      @click="setRoomData(room._id)"
                      color="secondary"
                      icon
                      x-small
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon alt="x mark">cancel</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title flat class="headline grey--text text--darken-2">
                      Delete room
                    </v-card-title>
                    <v-card-text>
                      Click "OK" to delete room. Removed rooms cannot be restored.
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
                        @click="deleteRoom()"
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
              <v-spacer />
              <v-img
                alt="Red lock icon"
                max-width="22"
                src="..\..\assets\img\privacyAlertIcon.png"
                v-if="room.access === 'private'"
              />
              <v-list-item-action v-if="room.access === 'public'">
                <v-btn
                  @click="join(room.slug)"
                  color="primary"
                  outlined
                  small
                >
                  join
                </v-btn>
              </v-list-item-action>
              <v-list-item-action v-if="room.access === 'private'">
                <v-dialog
                  max-width="600"
                  persistent
                  :retain-focus="false"
                  v-model="privateRoomModal"
                >
                  <template
                    class="mb-16"
                    v-slot:activator="{ on, attrs }"
                  >
                    <v-btn
                      @click="$store.dispatch('saveCurrentRoom', room)"
                      color="secondary"
                      outlined
                      type="submit"
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      join
                    </v-btn>
                  </template>
                  <PrivateRoomModal @close-modal="closeModals"/>
                </v-dialog>
              </v-list-item-action>
            </v-list-item>
            <v-list
              cols="12"
              v-if="errors && errors.length"
            >
              <v-list-item>
                <v-list-item-content>{{ errors }}</v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider />
          </v-list>
        </transition-group>
      </v-card>
      <v-dialog
        max-width="600"
        persistent
        v-model="addRoomModal"
      >
        <template
          class="mb-16"
          v-slot:activator="{ on, attrs }"
        >
          <v-btn
            color="primary"
            outlined
            small
            type="submit"
            v-bind="attrs"
            v-on="on"
          >
            add new room
          </v-btn>
        </template>
        <AddRoomModal @close-modal="closeModals" />
      </v-dialog>
    </v-flex>
  </v-container>
</template>

<script>
import AddRoomModal from '@/components/room/AddRoomModal.vue';
import PrivateRoomModal from '@/components/room/PrivateRoomModal.vue';
import axios from 'axios';
import remove from 'lodash.remove';
import { mapGetters } from 'vuex';
import * as io from 'socket.io-client';

export default {
  name: 'RoomList',
  components: {
    AddRoomModal,
    PrivateRoomModal,
  },
  data() {
    return {
      addRoomModal: false,
      roomError: this.$route.params.message,
      deleteError: '',
      deleteRoomModal: false,
      errors: [],
      id: '',
      privateRoomModal: false,
      rooms: [],
      socket: io('http://localhost:3000'),
      sortBy: 'Sort by given name',
      sorting: -1,
      toggleSort: false,
    };
  },

  created() {
    this.getRoomList();
    this.socket.on('removeRoomFromList', (slug) => {
      // eslint-disable-next-line no-underscore-dangle
      remove(this.sortedRooms, (room) => room.slug === slug);
      // eslint-disable-next-line no-underscore-dangle
      remove(this.rooms, (room) => room.slug === slug);
      this.$forceUpdate();
    });
  },

  computed: {
    ...mapGetters(['getUserInfo']),
    sortedRooms() {
      if (this.toggleSort) {
        return this.rooms.slice(0).sort((a, b) => (
          a.name.toLowerCase() < b.name.toLowerCase() ? this.sorting : -this.sorting
        ));
      }
      return this.rooms;
    },
  },

  methods: {
    closeModals() {
      this.addRoomModal = false;
      this.deleteError = '';
      this.deleteRoomModal = false;
      this.privateRoomModal = false;
    },

    deleteRoom() {
      axios.delete(`http://localhost:3000/api/room/${this.id}`, {
        data: this.getUserInfo,
      })
        .then((response) => {
          if (response.status === 200) {
            this.socket.emit('deleteRoom', response.data.path);
            this.closeModals();
          }
        })
        .catch((error) => {
          console.log(error);
          this.deleteError = error.response.data.error;
        });
    },

    getRoomList() {
      axios.get('http://localhost:3000/api/room')
        .then((response) => {
          this.rooms = response.data.data;
          this.socket.on('updateRoomList', (data) => {
            // eslint-disable-next-line no-underscore-dangle
            if (data._id !== this.id) {
              this.rooms.push({
                access: data.password ? 'private' : 'public',
                // eslint-disable-next-line no-underscore-dangle
                _id: data._id,
                name: data.name,
                password: data.password,
                slug: data.slug,
                user: data.user,
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
          this.roomError = error.response.data.message;
        });
    },

    join(roomSlug) {
      this.$router.push({
        name: 'Room',
        params: { slug: roomSlug },
      });
    },

    setRoomData(idNumber) {
      this.id = idNumber;
    },

    showRoomError() {
      this.roomError = '';
    },

    sort() {
      if (this.toggleSort) this.sortBy = 'sort by create date';
      else this.sortBy = 'sort by given name';
    },
  },
};
</script>
<style lang="scss">
.v-list
 {
  font-size: 12px;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.v-dialog {
  box-shadow: none!important;
}

.errorMessage {
  color: rgb(194, 57, 57)!important;
}

.roomName {
  flex: none;
}

.v-list:last-of-type > hr {
  display: none;
}

.roomErrorAlert {
  visibility: visible;
}

.whiteSpace {
  opacity: 0;
  transition: visibility 0.3s linear,opacity 0.3s linear;
  visibility: hidden;
}
</style>
