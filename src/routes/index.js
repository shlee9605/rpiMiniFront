import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import NotFound from '../views/NotFound.vue'


Vue.use(VueRouter)

const requireAuth = (to, from, next) => {   //router guard
  const isAuth = localStorage.getItem('token')
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
  isAuth ? next() : next(loginPath)
}

const OOCE = (to, from , next) => {         //router guard for login, signup
  const isAuth = localStorage.getItem('token')
  if(isAuth){
    next('/')
  }
  else{
    next()
  }
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    { 
      path: '/',        //home(profile) page
      component: Home,
      beforeEnter: requireAuth
    },
    { 
      path: '/login',   //login page
      component: Login,
      beforeEnter: OOCE
    },
    { 
      path: '/signup',  //join page
      component: SignUp,
      beforeEnter: OOCE,
    },
    { 
      path: '*',        //404 page
      component: NotFound 
    }
  ]
})

export default router