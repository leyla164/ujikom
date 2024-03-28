import axios from "axios";

const keranjang = {
    namespaced: true,
    state: {
       keranjang : []
    },
    getters: {
       getKeranjang: (state) => state.keranjang
    },
    actions: {
        async fetchKeranjang({ commit }) {
            try{
                // const token = localStorage.getItem('token');
                const dataKeranjang = await axios.post(
                    "https://ecommerce.olipiskandar.com/api/v1/carts",{
                        "temp_user_id" : null
                    }, {
                    headers : {
                        'Authorization' : `Bearer ${localStorage.getItem('token')}`
                    }
                    }

                );
                console.log(dataKeranjang.data['cart_items'])
                commit("SET_KERANJANG", dataKeranjang.data['cart_items']);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
    },
    mutations: {
        SET_KERANJANG(state, keranjang) {
            state.dataBrands = keranjang;
        }
    },
};
export default keranjang;