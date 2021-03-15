import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authState: false,
    privateRoomName: '',
  },

  getters: {
    isAuthorized: (state) => state.authState,
  },

  mutations: {
    setRoomName(state, name) {
      state.privateRoomName = name;
    },
    setAuthState(state, payload) {
      state.authState = payload;
    },
  },

  actions: {
    remitAuthState: (context, payload) => {
      context.commit('setAuthState', payload);
    },
  },
});
