import axios from "axios";

const auth = {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || "",
    loginError: null,
    user: JSON.stringify(localStorage.getItem("user") || null),
    userAddress: [],
    user: []
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    gettersUserAddress: (state) => state.userAddress
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(
          "https://ecommerce.olipiskandar.com/api/v1/auth/login",
          credentials
        );

        const token = response.data.access_token;
        // Save token to localStorage
        localStorage.setItem("token", token);
        commit("SET_TOKEN", token);
        commit("SET_LOGIN_ERROR", null);
        console.log("Token saved:", token);
        return true;
      } catch (error) {
        const errorMessage = error.response.data.message || "Login Failed";
        commit("SET_LOGIN_ERROR", errorMessage); //set error message in store
        console.error(error);
        return false;
      }
    },
    async register({ commit }, credentials) {
      try {
        const response = await axios.post(
          "https://ecommerce.olipiskandar.com/api/v1/auth/signup",
          credentials
        );

        const token = response.data.access_token;
        // Save token to localStorage
        localStorage.setItem("token", token);
        commit("SET_TOKEN", token);
        commit("SET_REGISTER_ERROR", null);
        console.log("Token saved:", token);
        return true;
      } catch (error) {
        const errorMessage = error.response.data.message || "Register Failed";
        commit("SET_REGISTER_ERROR", errorMessage); //set error message in store
        console.error(error);
        return false;
      }
    },
    async getUserInfo({ state, commit}) {
      try {
        const response = await axios.get(
          "https://ecommerce.olipiskandar.com/api/v1/user/info",
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        commit('SET_USER', response.data)
        return response.data.user;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async getUserAddress({ state,commit }) {
        try {
          const urlAddresses =
            'https://ecommerce.olipiskandar.com/api/v1/user/addresses';
          const response = await axios.get(urlAddresses, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          commit('SET_ADDRESS', response.data)
          return response.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      },

    logout({ commit }) {
      // Remove token from localStorage
      const token = localStorage.getItem("token");
      localStorage.removeItem("token");
      commit("SET_TOKEN", "");
      // Log token removed
      console.log("Token removed:", token);
      this.$router.push("/login");
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_LOGIN_ERROR(state, error) {
      state.loginError = error;
    },
    SET_REGISTER_ERROR(state, error) {
      state.registerError = error;
    },
    SET_USER(state, user) {
      state.user = user;
      // console.log("User data stored in store:", user);
    },
    SET_ADDRESS(state, address) {
        state.userAddress = address;
      }
  },
};

export default auth;