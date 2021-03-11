<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            color="primary"
            clearable
            clear-icon="x"
            label="Message"
            type="text"
            outlined
            v-model="message"
          >
            <template v-slot:append-outer>
              <v-btn
                color="primary"
                outlined
              >
                Send
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    };
  },
};
</script>
