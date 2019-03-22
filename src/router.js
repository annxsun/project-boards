import Vue from 'vue'
import Router from 'vue-router'
import TaskHome from './views/task/TaskHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'taskHome',
      component: TaskHome
    },
    // {
    //   path: '/task',
    //   name: 'task',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "tasklist" */ './views/task/TaskHome.vue')
    // }
  ]
})
