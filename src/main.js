import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarLang from 'quasar/lang/id';
import quasarIconSet from 'quasar/icon-set/material-icons';
import App from './App.vue';
import router from './router';
import pinia from './store';

// Import Quasar CSS
import 'quasar/src/css/index.sass';

// Create Vue App
const app = createApp(App);

// Use Quasar Plugin
app.use(Quasar, {
  plugins: {}, // Import Quasar plugins and add here
  lang: quasarLang,
  iconSet: quasarIconSet,
});

// Use Router and Pinia
app.use(router);
app.use(pinia);

// Mount the App
app.mount('#app');
