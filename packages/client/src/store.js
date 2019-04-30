import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: null
  },
  mutations: {
    update(state, payload) {
      state.auth = { ...state.auth, ...payload };
      try {
        localStorage.auth = JSON.stringify(payload);
      } catch (err) {
        console.error(err);
      }
    },
    remove(state) {
      state.auth = null;
      try {
        localStorage.removeItem('auth');
      } catch (err) {
        console.error(err);
      }
    }
  },
  actions: {}
});
