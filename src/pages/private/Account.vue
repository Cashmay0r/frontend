<template>
  <div class="text-black">
    <h1>Account</h1>
    <p v-if="user" v-text="'UID: ' + user.uid"></p>
    <p v-if="user" v-text="'Full Name: ' + user.displayName"></p>
    <p v-if="user" v-text="'Email: ' + user.email"></p>
  </div>
</template>

<script setup>
import { getUser } from "@/firebase";
import { onMounted, ref } from "vue";
onMounted(() => {
  fetchUser();
});
const user = ref(null);
const fetchUser = async () => {
  const response = await getUser();
  user.value = response;
  console.log(response);
};
</script>

<style></style>
