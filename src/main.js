// import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// import { useRatingsStore } from './stores/routes-ratings-store';
import App from './App.vue';

import './assets/tailwind.css'

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
