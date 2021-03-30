import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authState: false,
    currentRoom: {},
    user: {},
  },

  getters: {
    getCurrentRoom: (state) => state.currentRoom,
    getUserInfo: (state) => state.user,
    isAuthorized: (state) => state.authState,
  },

  mutations: {
    setAuthState(state, payload) {
      state.authState = payload;
    },
    setCurrentRoom(state, payload) {
      state.currentRoom = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },

  actions: {
    remitAuthState: (context, payload) => {
      context.commit('setAuthState', payload);
    },
    saveCurrentRoom: (context, payload) => {
      context.commit('setCurrentRoom', payload);
    },
    saveUser: (context, payload) => {
      context.commit('setUser', payload);
    },
  },
});
