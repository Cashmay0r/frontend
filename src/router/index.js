// 1. Define route components.
// These can be imported from other files
import {createRouter, createWebHistory} from 'vue-router';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import Account from '@/pages/private/Account.vue';
import {getUser} from '@/firebase';
import store from '../store';
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/account',
    component: Account,
    meta: {
      requiresAuth: true,
    },
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach(async (to, from) => {
  const user = await getUser();
  store.commit('setUser', user);
  console.log(store.state);

  if (to.meta.requiresAuth) {
    if (!user) return router.push('/');
  }
});

export default router;
