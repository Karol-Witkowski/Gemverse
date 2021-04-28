import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authState: false,
    currentRoom: {},
    user: {}
  },

  getters: {
    getCurrentRoom: state => state.currentRoom,
    getUserInfo: state => state.user,
    isAuthorized: state => state.authState
  },

  mutations: {
    SET_INITIAL_STATE: state => {
      state.authState = false;
      state.currentRoom = {};
      state.user = {};
    },

    SET_AUTH_STATE(state, payload) {
      state.authState = payload;
    },

    SET_CURRENT_ROOM(state, payload) {
      state.currentRoom = payload;
    },

    SET_USER(state, payload) {
      state.user = payload;
    }
  },

  actions: {
    remitAuthState: (context, payload) => {
      context.commit('SET_AUTH_STATE', payload);
    },

    resetState: context => {
      context.commit('SET_INITIAL_STATE');
    },

    saveCurrentRoom: (context, payload) => {
      context.commit('SET_CURRENT_ROOM', payload);
    },

    saveUser: (context, payload) => {
      context.commit('SET_USER', payload);
    }
  }
});
