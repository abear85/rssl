import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/teams',
      name: 'teams',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Teams.vue'),
    },
    {
      path: '/seasons/',
      name: 'seasons',
      component: () => import(/* webpackChunkName: "seasons" */ './views/Seasons.vue'),
    },
  ],
});
