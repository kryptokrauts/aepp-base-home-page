import Vue from 'vue';
import VueRouter from 'vue-router';
import AppList from '../views/AppList.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'app-list',
  component: AppList,
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
