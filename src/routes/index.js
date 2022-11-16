import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignIn from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'


Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
  const isAuth = localStorage.getItem('token')
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
  isAuth ? next() : next(loginPath)
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
      component: Login 
    },
    { 
      path: '/signin', 
      component: SignIn,
      beforeEnter: requireAuth,
    },
    { 
      path: '*', 
      component: NotFound 
    }
  ]
})

export default router