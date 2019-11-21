import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Question from '../views/Question.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AddQuestion from '../views/AddQuestion.vue'
import EditQuestion from '../views/EditQuestion.vue'
import Search from '../views/Search.vue'
import Searchtag from '../views/Searchtag.vue'
import Myquestion from '../views/Myquestion.vue'
import Myanswer from '../views/Myanswer.vue'
import Swal from 'sweetalert2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/question/:id',
    name: 'question',
    component: Question
  },
  {
    path: '/editquestion/:id',
    name: 'editquestion',
    component: EditQuestion
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/search/:key',
    name: 'search',
    component: Search
  },
  {
    path: '/tag/:tag',
    name: 'tag',
    component: Searchtag
  },
  {
    path: '/myquestion',
    name: 'myquestion',
    component: Myquestion
  },
  {
    path: '/myanswer',
    name: 'myanswer',
    component: Myanswer
  },
  {
    path: '/addquestion',
    name: 'addquestion',
    component: AddQuestion,
    beforeEnter: (to, from, next) => {
      next()
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        Swal.fire(
          'Stop!',
          'You must login first to continue!',
          'error'
        )
        next('/login')
      }
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
