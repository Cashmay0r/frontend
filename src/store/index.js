import {createStore} from 'vuex';
const store = createStore({
  state() {
    return {
      user: null,
      baseUrl: 'http://localhost:3000/',
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      console.log('User state changed: ', state.user);
    },
  },
  actions: {},
});

// Create a new store instance.

export default store;
