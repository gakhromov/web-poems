import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/components/HomePage'
import JoinCompetition from '@/components/JoinCompetition'
import Competition from '@/components/Competition'
import GradeYourPoem from '@/components/GradeYourPoem'
import LeaderBoard from '@/components/LeaderBoard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/join-competition',
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
    path: '/grade-your-poem',
    name: 'GradeYourPoem',
    component: GradeYourPoem,
  },
  {
    path: '/leaderboard',
    name: 'LeaderBoard',
    component: LeaderBoard,
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
