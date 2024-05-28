import { defineStore } from "pinia";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    isLoggedIn: null,
    accessToken: null,
    refreshToken: null,
    rememberMe: false,
    sessions: [],
    idUser: null,
    levelUser: null,
    userData: null,
    userRelasi: null,
  }),
  getters: {
    getSessionByName: (state) => (name) => {
      return state.sessions.find((session) => session.name === name);
    },
  },
  actions: {
    setIsLoggedIn(isLoggedIn) {
      this.isLoggedIn = isLoggedIn;
    },

    saveTokens(accessToken, refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    },

    deleteTokens() {
      this.accessToken = null;
      this.refreshToken = null;
    },

    saveSessions(session) {
      this.sessions.push(session);
    },

    deleteSessions() {
      this.sessions = [];
    },

    setRememberMe(rememberMe) {
      this.rememberMe = rememberMe;
    },

    setIdUser(idUser) {
      this.idUser = idUser;
    },

    setLevelUser(levelUser) {
      this.levelUser = levelUser;
    },

    saveUserData(user) {
      this.userData = user;
    },

    saveUserRelasi(relasi) {
      this.userRelasi = relasi;
    },

    resetAuthStore() {
      this.isLoggedIn = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.rememberMe = false;
      this.sessions = [];
      this.idUser = null;
      this.levelUser = null;
      this.userData = null;
    },
  },
});
