import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setupCalendar } from 'v-calendar';

import App from './App.vue';
import router from './router';

import './assets/main.css';
import 'material-icons/iconfont/outlined.css';

import useUserStore from './stores/user';

const app = createApp(App);

app.config.globalProperties.window = window;

app.use(createPinia());
app.use(router);
app.use(setupCalendar, {});

const user = useUserStore();
user.checkSigin();

app.mount('#app');
