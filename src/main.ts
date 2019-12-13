import 'normalize.css';
import 'focus-visible';
import 'aepp-base/src/components/icon.scss';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { i18n } from 'aepp-base/src/store/plugins/ui/languages';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(VueI18n);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

store.dispatch('init');
