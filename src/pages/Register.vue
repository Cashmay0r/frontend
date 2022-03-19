<template>
  <div class="w-full h-auto">
    <div class="h-auto flex flex-col justify-center items-center mt-10 w-4/6 m-auto text-gray-text">
      <div class="flex-row justify-start items-center w-full pb-3">
        <h1 class="text-2xl">Register Account</h1>
      </div>
      <form @submit.prevent="register" class="w-full">
        <div class="flex flex-col justify-start items-start w-full">
          <label for="email" class="label text-sm">Email:</label>
          <input type="email" class="input input-bordered w-full text-sm bg-white" placeholder="Enter Email" name="email" v-model="signup.email" required />
          <label for="firstName" class="label text-sm">First Name</label>
          <input type="text" class="input input-bordered w-full text-sm bg-white" placeholder="Enter First Name" name="firstName" v-model="signup.firstName" required />
          <label for="lastName" class="label text-sm">Last Name</label>
          <input type="text" class="input input-bordered w-full text-sm bg-white" placeholder="Enter Last Name" name="lastName" v-model="signup.lastName" required />
          <label for="password" class="label text-sm">Password</label>
          <input type="password" class="input input-bordered w-full text-sm bg-white" placeholder="Enter Password" name="password" v-model="signup.password" required />
          <label for="repeatPassword" class="label text-sm">Repeat Password</label>
          <input type="password" class="input input-bordered w-full text-sm bg-white" placeholder="Repeat Password" name="repeatPassword" v-model="signup.repeatPassword" required />
        </div>
        <p v-text="errorMsg.message" v-if="errorMsg.status" class="text-sm text-red-700"></p>
        <div class="flex flex-col justify-center items-center w-full mt-5">
          <button class="btn w-1/2 text-white bg-primary" type="submit">Register</button>
        </div>
      </form>

      <div class="flex flex-row justify-center items-center mt-1">
        <p class="text-sm">Already have an account? <router-link to="/" class="underline hover:no-underline text-primary">Login Here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
  import {reactive} from 'vue';
  import {useRouter} from 'vue-router';
  import {useStore} from 'vuex';
  const signup = reactive({
    email: '',
    password: '',
    repeatPassword: '',
    firstName: '',
    lastName: '',
  });

  const errorMsg = reactive({
    status: false,
    message: '',
  });

  const store = useStore();
  const router = useRouter();

  const resetSignup = () => {
    signup.email = '';
    signup.password = '';
    signup.repeatPassword = '';
    signup.firstName = '';
    signup.lastName = '';
  };

  const register = async () => {
    if (signup.password === signup.repeatPassword) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, signup.email, signup.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: signup.firstName + ' ' + signup.lastName,
          })
            .then(() => {
              console.log('User signed up', user);
              store.commit('setUser', user);
              router.push('/account');
            })
            .catch((error) => {
              console.log('User signed up');
              store.commit('setUser', user);
              router.push('/account');
            });

          // ...
        })
        .catch((error) => {
          resetSignup();
          const errorCode = error.code;
          const errorMessage = error.message;
          errorMsg.message = errorMessage;
          errorMsg.status = true;
          // ..
        });
    } else {
      (errorMsg.status = true), (errorMsg.message = 'Both passwords must be the same.');
    }
  };
</script>

<style></style>
