// src/stores/auth.js

import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false, // Tracks if the user is authenticated
    user: null, // Stores user details, can be expanded as needed
  }),
  actions: {
    setAuthenticated(status) {
      this.isAuthenticated = status;
    },
    setUser(userData) {
      this.user = userData;
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      localStorage.removeItem('token'); // Optional: Remove token on logout
    },
  },
});
