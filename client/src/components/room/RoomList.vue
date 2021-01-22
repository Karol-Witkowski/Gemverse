<template>
  <v-container
    fluid
    class="mt-16 ml-7"
  >
    <v-flex
      centered
      class="xs12 sm12 mt-16 mx-10"
    >
      <v-card class="mb-6">
        <v-card-title>List of rooms</v-card-title>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Programming room</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              color="blue lighten-2"
              outlined
            >
              Join
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Gaming room</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              color="blue lighten-2"
              outlined
            >
              Join
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Off-topic room</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              color="blue lighten-2"
              outlined
            >
              Join
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Private room</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              color="red lighten-2"
              outlined
            >
              Join
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
      </v-card>
      <v-dialog
        max-width="600px"
        v-model="dialog"
      >
        <template v-slot:activator="{ on, attrs }" mb-16>
          <v-btn
            color="blue lighten-2"
            large
            outlined
            v-bind="attrs"
            v-on="on"
          >
            Add new room
          </v-btn>
        </template>
        <AddRoom v-on:close-dialog="closeDialog"/>
      </v-dialog>
    </v-flex>
  </v-container>
</template>

<script>
import AddRoom from '@/components/room/AddRoom.vue';

export default {
  name: 'RoomList',
  components: {
    AddRoom,
  },
  data() {
    return {
      dialog: false,
    };
  },

  methods: {
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>
