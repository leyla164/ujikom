// import axios from "axios";

// const register = {
//   namespaced: true,
//   state: {
//     token: localStorage.getItem("token") || "",
//     user: JSON.parse(localStorage.getItem("user")) || null,
//   },
//   getters: {
//     isAuthenticated: (state) => !!state.token,
//     getUser: (state) => state.user,
//   },
//   actions: {
//     async register({ commit }, credentials) {
//       try {
//         const response = await axios.post(
//           "https://ecommerce.olipiskandar.com/api/v1/auth/signup",
//           credentials
//         );
//         const token = response.data.access_token;
//         const user = response.data.user;

//         // Save token to localStorage
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user));

//         commit("SET_TOKEN", token);
//         console.log("Token saved:", token);

//         commit("SET_USER", user);
//         console.log(user);

//         return true;
//       } catch (error) {
//         console.error(error);
//         return false;
//       }
//     },
//     logout({ commit }) {
//       // Remove token from localStorage
//       const token = localStorage.getItem("token");
//       localStorage.removeItem("user");
//       commit("SET_TOKEN", "");
//       commit("SET_USER", null);
//       // Log token removed
//       console.log("Token removed:", token);
//       window.location.href = "/register";
//     },
//   },
//   mutations: {
//     SET_TOKEN(state, token) {
//       state.token = token;
//     },
//     SET_USER(state, user) {
//       state.user = user;
//     },
//   },
// };

// export default register;