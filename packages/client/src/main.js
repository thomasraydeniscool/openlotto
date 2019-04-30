import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

import { checkAuth } from './util/auth'; 

Vue.config.productionTip = false;

/**
 * Check localStorage auth
 * on initial page load
 */
checkAuth();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
