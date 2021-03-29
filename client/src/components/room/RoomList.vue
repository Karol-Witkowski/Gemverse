<template>
  <v-container
    class="mt-16"
    fluid
  >
    <v-flex
      centered
      class="xs12 sm12 mt-6 mx-6"
    >
      <v-layout>
        <v-spacer />
        <v-btn
          @click="[toggleSort = !toggleSort, sort()]"
          color="primary"
          small
        >
          {{ sortBy }}
        </v-btn>
      </v-layout>
      <v-card class="mb-6">
        <v-card-title>List of rooms</v-card-title>
        <v-divider />
        <transition-group name="list" tag="p">
          <v-list
            class="py-0 list-item"
            cols="12"
            :key="room._id"
            v-for="room in sortedRooms"
          >
            <v-list-item>
              <v-list-item-content class="roomName">{{ room.name }}</v-list-item-content>
              <v-list-item-action v-if="getUserInfo._id === room.user">
                <v-dialog
                  max-width="600px"
                  persistent
                  :retain-focus="false"
                  overlay-opacity="0.15"
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
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>cancel</v-icon>
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
                      class="errorMsg"
                      v-if="deleteError"
                    >
                      {{ deleteError }}
                    </v-card-text>
                    <v-divider  />
                    <v-card-actions>
                      <v-btn
                        @click="closeModals"
                        color="primary"
                        text
                        outlined
                      >
                        Close
                      </v-btn>
                      <v-spacer />
                      <v-btn
                        @click="deleteRoom()"
                        color="primary"
                        text
                        outlined
                      >
                        OK
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item-action>
              <v-spacer />
              <v-img
                alt="Red lock icon"
                max-width="25px"
                src="..\..\assets\img\privacyAlertIcon.png"
                v-if="room.password"
              />
              <v-list-item-action v-if="!room.password">
                <v-btn
                  @click="join(room.slug)"
                  color="primary"
                  outlined
                >
                  Join
                </v-btn>
              </v-list-item-action>
              <v-list-item-action v-if="room.password">
                <v-dialog
                  max-width="600px"
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
                      type="submit"
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    >
                      Join
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
        max-width="600px"
        persistent
        v-model="addRoomModal"
      >
        <template
          class="mb-16"
          v-slot:activator="{ on, attrs }"
        >
          <v-btn
            color="primary"
            large
            type="submit"
            outlined
            v-bind="attrs"
            v-on="on"
          >
            Add new room
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
    this.socket.on('removeRoomFromList', (id) => {
      // eslint-disable-next-line no-underscore-dangle
      remove(this.sortedRooms, (room) => room._id === id);
      // eslint-disable-next-line no-underscore-dangle
      remove(this.rooms, (room) => room._id === id);
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
            this.socket.emit('deleteRoom', this.id);
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
          this.rooms = response.data;
          this.socket.on('updateRoomList', (data) => {
            console.log(data.name);
            // eslint-disable-next-line no-underscore-dangle
            if (data._id !== this.id) {
              this.rooms.push({
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
          this.errors.push(error);
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

    sort() {
      if (this.toggleSort) this.sortBy = 'Sort by create date';
      else this.sortBy = 'Sort by given name';
    },
  },
};
</script>
<style lang="scss">
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

.errorMsg {
  color: rgb(194, 57, 57)!important;
}

.roomName {
  flex: none;
}
.v-list:last-of-type > hr {
  display: none;
}
</style>
