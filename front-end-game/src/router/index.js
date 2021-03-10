import Vue from 'vue'
import VueRouter from 'vue-router'
import JoinCompetition from '../components/JoinCompetition'
import Competition from '../components/Competition'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'JoinCompetition',
    component: JoinCompetition,
    props: true,
  },
  {
    path: '/competition',
    name: 'Competition',
    component: Competition,
    props: true,
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
