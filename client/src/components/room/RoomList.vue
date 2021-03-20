<template>
  <v-container
    class="mt-16"
    fluid
  >
    <v-flex
      centered
      class="xs12 sm12 mt-6 mx-6"
    >
      <v-card class="mb-6">
        <v-card-title>List of rooms</v-card-title>
        <v-divider />
        <v-list
          class="py-0"
          cols="12"
          :key="room._id"
          v-for="room in rooms"
        >
          <v-list-item>
            <v-list-item-content>{{ room.name }}</v-list-item-content>
            <v-img
              alt="Red lock icon"
              class="mr-1"
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
                    @click="$store.dispatch('markPrivateRoom', room.name);"
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
            <v-list-item-action v-show="room.user && getUserInfo._id === room.user._id">
              <v-btn
                @click="console.log(x)"
                color="secondary"
                small
                type="submit"
              >
                DELETE
              </v-btn>
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
      errors: [],
      privateRoomModal: false,
      rooms: [],
      socket: io.connect('http://localhost:3000'),
    };
  },

  created() {
    this.getRoomList();
  },

  computed: {
    ...mapGetters(['getUserInfo']),
  },

  methods: {
    closeModals() {
      this.addRoomModal = false;
      this.privateRoomModal = false;
    },

    getRoomList() {
      axios.get('http://localhost:3000/api/room')
        .then((response) => {
          this.rooms = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      this.socket.on('newRoom', (roomName, locked, roomSlug) => {
        this.rooms.push({ name: roomName, password: locked, slug: roomSlug });
      });
    },

    join(roomSlug) {
      this.$router.push({
        name: 'Room',
        params: { slug: roomSlug },
      });
    },
  },
};
</script>
<style lang="scss">
.v-list:last-of-type > hr {
  display: none;
}
</style>
