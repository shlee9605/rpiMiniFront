import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import NotFound from '../views/NotFound.vue'


Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
  const isAuth = localStorage.getItem('token')
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
  isAuth ? next() : next(loginPath)
}

const OOCE = (to, from , next) => { //only one can enter
  const isAuth = localStorage.getItem('token')
  if(isAuth){
    next('/')
  }
  else{
    next()
  }
  // const homePath = `?rPath=${encodeURIComponent(to.path)}`
  // isAuth ? next() : next(homePath)
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    { 
      path: '/', 
      component: Home,
      beforeEnter: requireAuth
    },
    { 
      path: '/login', 
      component: Login,
      beforeEnter: OOCE
    },
    { 
      path: '/signup', 
      component: SignUp,
      beforeEnter: OOCE,
    },
    { 
      path: '*', 
      component: NotFound 
    }
  ]
})

export default router