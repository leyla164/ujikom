<template>
  <Navbar/>
  <router-view></router-view>
  <br><br>
  <Footer></Footer>
</template>

<script setup>

import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

</script>