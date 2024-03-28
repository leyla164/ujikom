<template>
  <br><br><br><br>

  <center>
    <div class="m-10 max-w-sm">
  <div class="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
    <div class="relative w-40 h-40 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <svg class="absolute-center w-40 h-40 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns=""><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
  </div>
    <h1 class="my-1 text-center text-xl font-bold leading-8 text-gray-900"></h1>
    <h3 class="font-lg text-semibold text-center leading-6 text-gray-600"></h3>
    <p class="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">{{ user.name }}</p>
    <p class="text-center text-sm leading-6 text-gray-500 hover:text-gray-600"> {{ user.email  }}</p>
    <ul class="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
      <li class="flex items-center py-3 text-sm">
        <span>Status</span>
        <span class="ml-auto"><span class="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">Open for side gigs</span></span>
      </li>
      <li class="flex items-center py-3 text-sm">
        <span>Joined On</span>
        <span class="ml-auto">Apr 08, 2022</span>
      </li>
      <li class="flex items-center py-3 text-sm" v-for="get in address.data">
        <span>Address</span>
        <span class="ml-auto">{{ get.address }} {{ get.city }} {{ get.state }} {{ get.postal_code }}</span>
      </li>
    </ul>
  </div>
</div>
</center>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters("auth", ["getUser"]),
        ...mapGetters('auth', ['gettersUserAddress']),
        user() {
            return this.getUser;
        },
        address() {
            return this.gettersUserAddress;
  },
    },
    methods: {
        ...mapActions("auth", ["getUserInfo"]),
        ...mapActions('auth', ['getUserAddress']),
    },
    async mounted() {
       this.getUserAddress();
       const user = await this.getUserInfo();

      if (user) {
      this.$store.commit('auth/SET_USER', user);
  }
},
     created() {
     this.getUserInfo();
},
};
</script>