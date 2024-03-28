<template>
    <div class="font-sans text-base text-gray-900 sm:px-10">
  <div class="text-base text-gray-900">
    <div class="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
      <div class="mx-2 pt-12 text-center md:mx-auto md:w-2/3 md:pb-12">
        <br><br>
        <h1 class="mb-4 text-3xl font-black sm:text-5xl xl:text-6xl">Penilaian saya</h1>
        <div class="text-lg sm:text-xl xl:text-xl">
        </div>
      </div>
    </div>
  </div>
  <div class="mx-auto mb-20 flex w-full max-w-screen-lg flex-col overflow-hidden rounded-xl text-gray-900 md:flex-row md:border md:shadow-lg">
    <form class="mx-auto w-full max-w-xl border-gray-200 px-10 py-8 md:px-8">
      <div class="mb-4"><label class="text mb-2 block font-medium" for="email">Nama Produk:</label><input class="w-full rounded border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring" id="email" type="email"></div>
      <div class="mb-4"><label class="text mb-2 block font-medium" for="message">Deskripsi:</label><textarea class="h-52 w-full rounded border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring" id="message"></textarea></div>
      <div class="mb-4"><label class="text mb-2 block font-medium" for="subject">Kualitas Produk :</label><input class="w-full rounded border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring" id="subject" type="subject"></div>
  <div class="flex items-center">
    
        <div class="flex-1"></div>
        <button class="rounded-xl bg-blue-600 px-4 py-3 text-center font-bold text-white hover:bg-blue-700" type="submit">Send message</button>
      </div>
    </form>
  </div>
</div>

</template>


  
  <!-- <script>
  import { mapGetters, mapActions} from "vuex";
  
  export default {
      data() {
          return {
              token: null,
              cek: 1
          }
      },
    computed: {
        ...mapGetters("product", ["getProdukBySlug"]),
        product() {
            return this.getProdukBySlug(this.$route.params.slug);
        },
    },
    methods: {
        ...mapActions("product", ["fetchSingleProduk"]),
        ...mapActions("product",["fetchProduk"]),

        // cart
        ...mapActions('cart', ['fetchCart']),


        // add to cart
        ...mapActions('product', ['addToCart']),

        async addToCart(productId){
            try {
                await this.$store.dispatch('product/addToCart', productId);
                this.fetchCart();
            } catch (error) {
                console.error(error);
            }
        },
        
        capitalizeFirstLetter(text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        },
        tambah() {
            this.cek++
        },
        kurang() {
            if (this.cek > 1) {
                this.cek--
            }

        }
    },
    beforeMount(){
      this.fetchProduk()
      this.fetchCart()
    },
    mounted(){
      const produkSlug = this.$route.params.slug;
      this.fetchSingleProduk(produkSlug);
  
      //cek token
      const cektoken = localStorage.getItem('token');
      this.token = cektoken
    },
  };
  </script> -->