import Vue from 'vue';
import VueRouter from 'vue-router';

// Auth
import AuthLayout from '@/views/layouts/AuthLayout.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';

// Book
import BookLayout from '@/views/layouts/BookLayout.vue';
import BookHome from '@/views/book/BookHome.vue';
import BookDetail from '@/views/book/BookDetail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
      },
    ],
  },
  {
    path: '/book',
    component: BookLayout,
    children: [
      {
        path: '',
        component: BookHome,
      },
      {
        path: ':book_id',
        component: BookDetail,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
