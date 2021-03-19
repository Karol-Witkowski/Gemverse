import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authState: false,
    user: '',
    privateRoomName: '',
  },

  getters: {
    getUserInfo: (state) => state.user,
    isAuthorized: (state) => state.authState,
  },

  mutations: {
    setUsername(state, payload) {
      state.user = payload;
    },
    setRoomName(state, payload) {
      state.privateRoomName = payload;
    },
    setAuthState(state, payload) {
      state.authState = payload;
    },
  },

  actions: {
    saveUser: (context, payload) => {
      context.commit('setUsername', payload);
    },
    remitAuthState: (context, payload) => {
      context.commit('setAuthState', payload);
    },
  },
});
