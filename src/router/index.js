import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: () => import(/* webpackChunkName: "pedidos" */ '../views/PedidosView.vue')
  },
  {
    path: '/reabastecimento',
    name: 'reabastecimento',
    component: () => import(/* webpackChunkName: "reabastecimento" */ '../views/ReabastecimentoView.vue')
  },
  {
    path: '/remessas',
    name: 'remessas',
    component: () => import(/* webpackChunkName: "remessas" */ '../views/RemessasView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
