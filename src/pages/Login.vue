<template>
  <div class="w-full h-auto">
    <div class="h-auto flex flex-col justify-center items-center mt-10 w-4/6 m-auto">
      <form @submit.prevent="login" class="w-full" v-if="!resettingPassword">
        <div class="flex-row justify-start items-center w-full pb-3">
          <h1 class="text-2xl">Login</h1>
        </div>
        <div class="flex flex-col justify-start items-start w-full">
          <label for="email" class="label text-sm">Email:</label>
          <input
            type="email"
            class="input input-bordered w-full text-sm"
            placeholder="Enter Email"
            name="email"
            v-model="user.email"
            required
            autofocus
          />
        </div>
        <div class="flex flex-col justify-center items-start w-full">
          <label for="password" class="label text-sm">Password</label>
          <input
            type="password"
            class="input input-bordered w-full text-sm"
            placeholder="Enter Password"
            name="password"
            v-model="user.password"
            required
          />
          <p
            v-text="errorMsg.message"
            class="text-red-700 text-sm label"
            v-if="errorMsg.status"
          ></p>
          <p
            v-text="successMsg.message"
            class="text-sm label"
            v-if="successMsg.status"
          ></p>
        </div>
        <div class="w-full flex flex-row justify-end items-center gap-2">
          <a
            class="underline label text-sm text-primary"
            @click="resettingPassword = true"
            >Forgot password?</a
          >
        </div>
        <div class="flex flex-col justify-center items-center w-full mt-5">
          <button class="btn w-1/2 btn-primary" type="submit">Login</button>
        </div>
      </form>
      <form @submit.prevent="resetPassword" v-if="resettingPassword" class="w-full">
        <div class="flex-row justify-start items-center w-full pb-3">
          <h1 class="text-2xl">Reset Password</h1>
        </div>
        <div class="flex flex-col justify-start items-start w-full">
          <label for="email" class="label text-sm">Email:</label>
          <input
            type="email"
            class="input input-bordered w-full text-sm"
            placeholder="Enter Email"
            name="email"
            v-model="resetEmail"
          />
        </div>
        <div class="flex flex-col justify-center items-center w-full mt-5">
          <button class="btn w-1/2 btn-primary" type="submit">Send</button>
        </div>
      </form>
      <div
        class="w-full flex flex-row justify-end items-center"
        v-if="!resettingPassword"
      >
        <p class="text-sm w-full flex flex-row justify-center items-center">
          Don't have an account?
          <router-link
            to="/register"
            href=""
            class="underline label hover:no-underline text-primary"
            >Register here</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const user = reactive({
  email: "",
  password: "",
});
const errorMsg = reactive({
  status: false,
  message: "",
});
const successMsg = reactive({
  status: false,
  message: "",
});
const resetEmail = ref("");

const resettingPassword = ref(false);

const store = useStore();
const router = useRouter();

const loggingIn = ref(false);
const login = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User logged in");
      store.commit("setUser", user);
      router.push("/list");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      user.email = "";
      user.password = "";
      errorMsg.status = true;
      errorMsg.message = error.message;
      if (error.code == "auth/too-many-requests")
        errorMsg.message = "Too many login attempts, please reset password.";
      if (error.code == "auth/user-not-found") errorMsg.message = "User does not exist.";
      if (error.code == "auth/wrong-password") errorMsg.message = "Incorrect Password.";
    });
};

const resetPassword = () => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, resetEmail.value)
    .then(() => {
      resettingPassword.value = false;
      resetEmail.value = "";
      successMsg.status = true;
      successMsg.message = "Reset password email sent.";
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};
</script>

<style></style>
