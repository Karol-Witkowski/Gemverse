<template>
  <v-container
    fluid
    class="ml-7"
  >
    <v-flex
      centered
      class="xs12 sm12 mt-16 mx-10"
    >
      <v-card class="mb-6">
        <v-card-title>List of rooms</v-card-title>
        <v-divider />
        <v-list
          cols="16"
          :key="room._id"
          v-for="room in rooms"
         >
           <v-list-item>
             <v-list-item-content>
               {{ room.name }}
             </v-list-item-content>
             <v-list-item-action>
               <v-btn
                 @click.stop="join(room._id)"
                 color="blue lighten-2"
                 outlined
               >
                 Join
               </v-btn>
             </v-list-item-action>
           </v-list-item>
           <v-list
             cols="16"
             v-if="errors && errors.length"
            >
             <v-list-item>
               <v-list-item-content>
                 {{errors}}
               </v-list-item-content>
             </v-list-item>
           </v-list>
           <v-divider />
        </v-list>
      </v-card>
      <v-dialog
        max-width="600px"
        persistent
        v-model="dialog"
      >
        <template
          mb-16
          v-slot:activator="{ on, attrs }"
        >
          <v-btn
            color="blue lighten-2"
            large
            type="submit"
            outlined
            v-bind="attrs"
            v-on="on"
          >
            Add new room
          </v-btn>
        </template>
        <AddRoom @close-dialog="closeDialog" />
      </v-dialog>
    </v-flex>
  </v-container>
</template>

<script>
import AddRoom from '@/components/room/AddRoom.vue';
import axios from 'axios';
import io from 'socket.io-client';

export default {
  name: 'RoomList',
  components: {
    AddRoom,
  },
  data() {
    return {
      dialog: false,
      errors: [],
      rooms: [],
      socket: io('http://localhost:8080/#/roomlist'),
    };
  },

  created() {
    axios.get('http://localhost:3000/api/room')
      .then((response) => {
        this.rooms = response.data;
      })
      // REMINDER Later add handle error message
      .catch((e) => {
        this.errors.push(e);
      });

    this.socket.on('getNewRooms', (data) => {
      if (data.room.name === this.$route.params) {
        this.chats.push(data.room);
      }
    });
  },

  methods: {
    closeDialog() {
      this.dialog = false;
    },

    join(id) {
      this.$router.push({
        name: 'Room',
        params: { id },
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
