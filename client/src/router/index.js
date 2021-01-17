import Vue from 'vue';
import VueRouter from 'vue-router';
import Rooms from '../views/Rooms.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Rooms',
    component: Rooms,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/Chat.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
