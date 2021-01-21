import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/room',
    name: 'Room',
    component: () => import('../components/room/Room.vue'),
  },
  {
    path: '/roomlist',
    name: 'RoomList',
    component: () => import('../components/room/RoomList.vue'),
  },
  {
    path: '*',
    component: () => import('@/components/error/NotFound.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
