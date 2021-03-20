import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authState: false,
    privateRoomName: '',
    user: {},
  },

  getters: {
    isAuthorized: (state) => state.authState,
    getPrivateRoomName: (state) => state.privateRoomName,
    getUserInfo: (state) => state.user,
  },

  mutations: {
    setAuthState(state, payload) {
      state.authState = payload;
    },
    setPrivateRoomName(state, payload) {
      state.privateRoomName = payload;
    },
    setUsername(state, payload) {
      state.user = payload;
    },
  },

  actions: {
    remitAuthState: (context, payload) => {
      context.commit('setAuthState', payload);
    },
    markPrivateRoom: (context, payload) => {
      context.commit('setPrivateRoomName', payload);
    },
    saveUser: (context, payload) => {
      context.commit('setUsername', payload);
    },
  },
});
