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
    path: '/login',
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
    // later put below /roomlist/room/:id/:user
    path: '/room/:id',
    name: 'Room',
    component: () => import('../components/room/Room.vue'),
  },
  {
    path: '*',
    component: () => import('@/components/error/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
