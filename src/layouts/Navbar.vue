<template>
  <div class="w-full h-screen bg-primary translate-y-100 transform fixed top-0 overflow-hidden transition duration-300 ease-in-out z-auto" :class="!toggleMenu && '-translate-x-full'">
    <div class="w-full h-full flex flex-col justify-start items-center gap-10 text-3xl text-secondary mt-24">
      <router-link to="/" @click="toggleMenu = false">Home</router-link>
      <router-link to="/account" @click="toggleMenu = false" v-if="this.$store.state.user">Acount</router-link>
      <button @click="logout" v-if="this.$store.state.user">Logout</button>
    </div>
  </div>
  <div class="w-full h-36 flex flex-row justify-between items-start bg-primary p-3">
    <div class="w-1/3 flex flex-row justify-start items-center">
      <button class="group flex h-12 w-12 transform flex-col items-center justify-center rounded transition duration-150 hover:scale-105" @click="toggleMenu = !toggleMenu">
        <div class="ease my-1 h-1 w-10 transform rounded-full transition duration-200 bg-secondary" :class="toggleMenu ? 'translate-y-3 rotate-45 opacity-100' : 'opacity-100'"></div>
        <div class="ease my-1 h-1 w-10 transform rounded-full transition duration-200 bg-secondary" :class="toggleMenu ? 'opacity-0' : 'opacity-100'"></div>
        <div class="ease my-1 h-1 w-10 transform rounded-full transition duration-200 bg-secondary" :class="toggleMenu ? '-translate-y-3 -rotate-45 opacity-100' : 'opacity-100'"></div>
      </button>
    </div>
    <div class="top-0">
      <h1 class="text-white text-4xl">TODO</h1>
    </div>
    <div class="w-1/3 flex flex-row justify-end items-center">
      <a href="" @click="logout" class="h-10 w-10" v-if="this.$store.state.user"><LoginIcon class="w-10 h-auto text-secondary" /></a>
    </div>
  </div>
</template>

<script setup>
  import {useStore} from 'vuex';
  import {getAuth, signOut} from 'firebase/auth';
  import {LoginIcon} from '@heroicons/vue/solid';
  import {ref} from '@vue/reactivity';

  const store = useStore();

  const toggleMenu = ref(false);
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        store.commit('setUser', null);
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    toggleMenu.value = false;
  };
</script>

<style></style>
