<template>
  <v-container
    class="mt-16 pt-16"
    cols="6"
    fluid
  >
    <v-flex class="mx-6">
      <v-card>
        <v-card-title>
          Profile
        </v-card-title>
        <v-card-actions>
          <v-btn
            color="secondary"
            outlined
          >
            delete account
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters(['getUserInfo']),
  },
};
</script>
