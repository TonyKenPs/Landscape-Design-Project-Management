import { defineStore } from 'pinia';
import http from '@/http';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    // True once the cookie session has been probed for this page load, so the
    // router guard does not hit /api/users/current on every navigation.
    sessionChecked: false,
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

    // The JWT lives in an httpOnly cookie, so the only way to know whether a
    // session is still valid is to ask the API.
    async ensureSession() {
      if (this.isAuthenticated) {
        return true;
      }
      if (this.sessionChecked) {
        return false;
      }

      try {
        const res = await http.get('/api/users/current');
        const data = (res.data && res.data.data) || {};
        this.setUser({ sub: data.id, username: data.username, identity: data.identity });
        this.setIdentity(data.identity || {});
        this.setAuthenticated(true);
        return true;
      } catch (error) {
        this.clearCurrentState();
        return false;
      } finally {
        this.sessionChecked = true;
      }
    },

    async logout() {
      try {
        await http.post('/api/login/logout');
      } catch (error) {
        // The cookie may already be gone; clearing local state is enough.
      }
      this.clearCurrentState();
      this.sessionChecked = true;
    },
  },
});
