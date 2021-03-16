import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/authentication/Register.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/authentication/Login.vue'),
    props: true,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/roomlist',
    name: 'RoomList',
    component: () => import('../components/room/RoomList.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/room/:slug',
    name: 'Room',
    component: () => import('../components/room/Room.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '*',
    component: () => import('@/components/error/NotFound.vue'),
    meta: {
      requiresAuth: false,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('authenticationToken') === null) {
      localStorage.clear();
      next({
        name: 'Login',
        params: { message: 'Please login to proceed' },
      });
    } else {
      next();
    }
  } else if (!to.meta.requiresAuth) {
    if (localStorage.getItem('authenticationToken')) {
      next();
    } else {
      next();
    }
  } else {
    next();
  }
  next();
});

export default router;
