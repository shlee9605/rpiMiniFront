<template>
  <nav class="header">
    <div class="header-logo">
      <router-link to="/" color="white">Home</router-link>
    </div>
    <div class="header-auth">
      <a href="" v-if="isAuth" @click.prevent="logout">Logout</a>
      <router-link v-else to="/login">Login</router-link>
    </div>
  </nav>
</template>

<script>
import {setAuthInHeader} from '../api'

export default {
  data(){
    return{
      temp: ''
    }
  },

  computed: {
    isAuth() {
      return !!localStorage.getItem('token')
    }
  },

  methods: {
    logout() {
      delete localStorage.token
      delete localStorage.user
      setAuthInHeader(null)
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.header {
  background-color:rgba(115, 212, 136, 0.92);
  height: 70px;
  padding: 2px;
  justify-content: center;
}
.header a {
  display: block;
  /* height: 30px; */
  line-height: 30px;
  font: white;
  margin-top: 10px;
  color: rgba(255,255,255,.5);
}
.header-logo {
  position: absolute;
  left: 50%;
  top: 7px;
  margin-left: -30px;
  text-align: center;
  font-weight: bolder;
  font-size: 24px;
}
.header-logo a:hover,
.header-logo a:focus {
  color: rgba(255,255,255,.9);
}
.header-auth {
  position: absolute;
  right: 15px;
  top: 5px;
}
.header-auth a {
  border-radius: 2px;
  padding: 0 10px;
  background-color: rgba(255,255,255, .5);
  color: white;
  transition: all .3s;
}
.header-auth a:hover,
.header-auth a:focus {
  background-color: rgba(255,255,255, .3);
}
</style>