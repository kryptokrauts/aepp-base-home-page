import Vue from 'vue';
import VueRouter from 'vue-router';
import Apps from '../views/Apps.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'apps',
  component: Apps,
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
