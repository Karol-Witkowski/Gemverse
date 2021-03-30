import Vue from 'vue';
import axios from 'axios';
import io from 'socket.io-client';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import tokenSetter from './utils/authTokenSetter';

Vue.config.productionTip = false;

if (localStorage.authenticationToken) {
  tokenSetter(localStorage.authenticationToken);
} else {
  tokenSetter(null);
}

const socket = io('http://localhost:3000');
store.dispatch('assignInvidualSocket', socket);

axios.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('authenticationToken');
      store.dispatch('remitAuthState', false);
      router.push({
        name: 'Login',
        params: { message: 'Session expired, please login again' },
      });
    }
    return Promise.reject(error);
  },
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
