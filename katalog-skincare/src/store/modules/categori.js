import axios from "axios";

const categories = {
  namespaced: true,
  state: {
    categoriesData: [],
  },
  getters: {
    getCategories: (state) => state.categoriesData,
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const data = await axios.get(
          "https://ecommerce.olipiskandar.com/api/v1/all-categories"
        );
        commit("SET_CATEGORIES", data.data);
      } catch (error) {
        alert(error);
        console.log(error)
      }
    },
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categoriesData = categories;
    },
  },
};

export default categories;