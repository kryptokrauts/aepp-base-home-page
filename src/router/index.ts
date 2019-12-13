import Vue from 'vue';
import VueRouter from 'vue-router';
import AppList from '../views/AppList.vue';
import AppDetails from '../views/AppDetails.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'app-list',
  component: AppList,
}, {
  path: '/*',
  name: 'app-details',
  component: AppDetails,
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
