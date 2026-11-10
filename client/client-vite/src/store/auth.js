import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: {},
    identity: {},
  }),

  getters: {
    isAuthenticatedGetter: (state) => state.isAuthenticated,
    userGetter: (state) => state.user,
    identityGetter: (state) => state.identity,
  },

  actions: {
    setAuthenticated(isAuthenticated) {
      this.isAuthenticated = !!isAuthenticated;
    },

    setUser(user) {
      this.user = user || {};
    },

    setIdentity(identity) {
      this.identity = identity || {};
    },

    clearCurrentState() {
      this.isAuthenticated = false;
      this.user = {};
      this.identity = {};
    },
  },
});
