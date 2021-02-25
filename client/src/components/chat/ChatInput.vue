<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="16">
          <v-text-field
            color="blue lighten-2"
            clearable
            clear-icon="x"
            label="Message"
            type="text"
            outlined
            v-model="message"
          >
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <img
                  alt="Arrow in circle"
                  height="30"
                  src="..\..\assets\img\sendCircleIcon.png"
                  width="30"
                >
              </v-fade-transition>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    message: '',
  }),
};
</script>
