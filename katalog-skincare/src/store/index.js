import { createStore } from "vuex";
import users from "./modules/user";
import brands from "./modules/brands";
import product from "./modules/product";
import categories from "./modules/categori";
import auth from "./modules/auth";
import cart from "./modules/cart";
import order from "./modules/order";

const store = createStore({
  state: {
    isLoading: false,
  },
  modules: {
    users,
    auth,
    brands,
    product,
    categories,
    cart,
    order
  },
});

export default store;