import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_USER: "SET_USER",
  SET_IDENTITY: "SET_IDENTITY",
};
const state = {
  isAuthenticated: false,
  user: {},
  identity: {},
};
const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
  user: (state) => state.user,
  identity: (state) => state.identity,
};
const mutations = {
  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  },
  [types.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {};
  },
  [types.SET_IDENTITY](state, identity) {
    if (identity) state.identity = identity;
    else state.identity = {};
  },
};

const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },
  setIdentity: ({ commit }, identity) => {
    commit(types.SET_IDENTITY, identity);
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_AUTHENTICATED, false);
    commit(types.SET_USER, null);
    commit(types.SET_IDENTITY, null);
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
