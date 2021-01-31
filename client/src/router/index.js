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
    path: '/register',
    name: 'Register',
    component: () => import('@/components/auth/Register.vue'),
  },
  {
    path: '/login/:id',
    name: 'Login',
    component: () => import('../components/auth/Login.vue'),
  },
  {
    path: '/roomlist/addroom',
    name: 'AddRoom',
    component: () => import('../components/room/AddRoom.vue'),
  },
  {
    path: '/roomlist',
    name: 'RoomList',
    component: () => import('../components/room/RoomList.vue'),
  },
  {
    path: '/roomlist/room/:id/:user',
    name: 'Room',
    component: () => import('../components/room/Room.vue'),
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
