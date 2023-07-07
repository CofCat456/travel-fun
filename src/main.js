import './assets/main.css';
import 'material-icons/iconfont/outlined.css';

import { createPinia } from 'pinia';
import { setupCalendar } from 'v-calendar';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.config.globalProperties.window = window;

app.use(createPinia());
app.use(router);
app.use(setupCalendar, {});

app.mount('#app');
