<template>
  <div class="bg-gray-100 h-screen w-full">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navbar from "@/layouts/Navbar.vue";
</script>
<style></style>
