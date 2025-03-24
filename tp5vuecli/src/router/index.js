import { createRouter, createWebHistory } from 'vue-router'

import home from '../components/home.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
 
  {
    path: '/createpost',
    name: 'createpost',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/createpost.vue')
  },
  {
    path: '/home/posting',
    name: 'posting',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/posting.vue')
  },
  {
    path: '/home/taglist',
    name: 'taglist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/taglist.vue')
  },
  {
    path: '/home/posting/singlepost',
    name: 'singlepost',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/singlepost.vue')
  },
  {
    path: '/home/posting/singlepost/postdetail/:id',
    name: 'postdetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/postdetail.vue')
  },
  {
    path: '/home/taglist/fromtarget/:tag',
    name: 'fromtarget',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/fromtarget.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/edit.vue')
  },

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
