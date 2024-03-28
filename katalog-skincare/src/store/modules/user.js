import axios from "axios";

const users = {
    namespaced: true,
    state: {
        userData: [],
    },
    getters: {
        getUsers: (state) => state.userData,
    },
    actions: {
        async fetchUsers({ commit }, userData) {
            try {
              const response= await axios.post(
                "https://fakestoreapi.com/users",
                userData
              );
              commit("ADO_USER", response.data);
               return response.data;
            } 
            catch (error) {
                alert (error);
                console.log(error);
            }
        },
    },
    mutations: {
        SET_USERS(state, users) {
            state.userData = users;
        },
        ADO_USER(state, user){
            state.userData.push(user);
        },
    },
};

export default users;