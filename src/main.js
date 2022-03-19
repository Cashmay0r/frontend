import {createApp} from 'vue';
import App from './App.vue';
import '@/assets/css/tailwind.css';
import store from '@/store/index.js';
import router from '@/router/index.js';

const app = createApp(App).use(store).use(router);
app.mount('#app');
