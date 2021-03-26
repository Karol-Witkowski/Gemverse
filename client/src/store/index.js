import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authState: false,
    currentRoom: {},
    privateRoomName: '',
    user: {},
  },

  getters: {
    isAuthorized: (state) => state.authState,
    getPrivateRoomName: (state) => state.privateRoomName,
    getCurrentRoom: (state) => state.currentRoom,
    getUserInfo: (state) => state.user,
  },

  mutations: {
    setAuthState(state, payload) {
      state.authState = payload;
    },
    setPrivateRoomName(state, payload) {
      state.privateRoomName = payload;
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
    markPrivateRoom: (context, payload) => {
      context.commit('setPrivateRoomName', payload);
    },
    saveCurrentRoom: (context, payload) => {
      context.commit('setCurrentRoom', payload);
    },
    saveUser: (context, payload) => {
      context.commit('setUser', payload);
    },
  },
});
