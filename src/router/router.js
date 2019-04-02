import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/Login'
import Register from '../views/login/Register'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/task',
      name: 'task',
      component: () => import(/* webpackChunkName: "task" */ '../views/task/TaskHome.vue'),
      meta: {
        needLogin: true
      }
    },
  ]
});


router.beforeEach((to, from, next) => {
    if (!to.meta.needLogin) {
        next();
        return;
    }
    if(sessionStorage.getItem('token')) {
        next();
        return;
    }
    next({
      path: '/',
      query: {redirect: to.fullPath}
    })
});

export default router;
