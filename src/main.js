import Vue from 'vue';
import axios from 'axios';
import { nanoid } from 'nanoid';
import App from './App.vue';
import router from './router';
import store from './store';
import Button from './components/Button.vue';

Vue.component('Button', Button);

Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://bukubagus.test';

Vue.prototype.$nanoid = nanoid;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
