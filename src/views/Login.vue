<template>
  <div class="login">
    <div></div>
    <div><h1>참참참 로그인하기</h1></div>
    <!-- <v-col cols="60" xs="60" sm="40" md="40" lg="40" class="ma-auto"> -->
      <!-- <div class="loginbox"> -->
      <div class="lineContainer">

        <form @submit.prevent="onSubmit" >
          <div class = "innerDiv">
            <label for="userid">Userid : </label>
            <input class="form-control" type="text" name="userid" 
              v-model="userid" autofocus placeholder="e.g., test@test.com" />
          </div>
          <div class = "innerDiv">
            
            <label for="password">Passwrod : </label>
            <input class="form-control" type="password" 
              v-model="password" placeholder="123123" />

          </div>
          <div class = "innerDiv"></div>
          <div class = "innerDiv2">
            <div>

            </div>
            <div>
            <button  class="btn" :class="{'btn-success': !invalidForm}" type="submit" 
              :disabled="invalidForm"> Log In </button>
            
            <button  class="btn" :class="{'btn-success': !invalidForm}" type="submit"
              :disabled="invalidForm"> <router-link to="/signup"> signup</router-link> </button>

            </div>

          </div>
        </form>
        <div>
            </div>
      <!-- </div> -->
      </div>

      <p class="error" v-if="error">{{error}}</p>
    <!-- </v-col> -->

    <div>
    </div>

  </div>
</template>

<script>
import {auth, setAuthInHeader} from '../api'

export default {
  data() {
    return {
      userid: '',
      password: '',
      error: '',
      rPath: ''
    }
  },
  computed: {
    invalidForm() {
      return !this.userid || !this.password
    }
  },
  created() {
    this.rPath = this.$route.query.rPath || '/'
  },
  methods: {
    onSubmit() {
      auth.login(this.userid, this.password)
        .then(data => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', this.userid)
          setAuthInHeader(data.token)
          this.$router.push(this.rPath)
        })
        .catch(err => {
          this.error = err.data.error
        })
    }
  }
}
</script>

<style>
.login {
  width: 400px;
  height: 90%;
  margin: auto;
  margin-top: 30px;
  border: 3px solid rgb(115, 212, 136);
  background-color: rgba(220, 236, 224, 0.548);
  border-radius: 10px;
  display: grid;
  flex-wrap: wrap;
}

div {
  justify-content: center;
}
.innerDiv{
  width: 100%;
  height:100%;
  margin-top: 10px;
}
.innerDiv2{
  width: 100%;
  height:100%;
  margin-top: 10px;
  display: grid;
  grid-template-columns: 50% 50%;
  
}
/* .lineContainer {
  
  border: solid 1px black;
} */
.error {
  color: #f00;
}

</style>