import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#64B5F6',
        secondary: '#EF5350',
      },
    },
  },
});

export default vuetify;
