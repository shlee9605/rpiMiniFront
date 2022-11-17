<template>
  <div>
   <div class="login">
    <v-col cols="60" xs="60" sm="40" md="40" lg="40" class="ma-auto">
    <h1 class="headOne">참참참 회원가입하기</h1>
    <ValidationObserver
    ref="signUpForm"
    v-slot="{ handleSubmit, invalidForm, validate }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider
      name="아이디"
      rules="required"
      v-slot="{ errors }">
      <div class = "innerDiv1">
        <label for="userid"> Userid : </label>
        <input class="form-control" type="text" 
          v-model="userid" 
          :error-messages="errors"/>
      </div>
      </ValidationProvider>
      
      <ValidationProvider
      name="비밀번호"
      rules="required"
      v-slot="{ errors }">
      <div class = "innerDiv2">
        <label for="password">Passwrod : </label>
        <input class="form-control" type="password" 
          v-model="password"
          :error-messages="errors" />
      </div>
      </ValidationProvider>
      <div class = "innerDiv3">
      <button  class="btn" 
       :disabled="invalidForm || !validate" type="submit"> SignUp </button>
      </div>
    </form>
    </ValidationObserver>
    </v-col>
  </div>
    
  </div>
</template>

<script>
import Validate from '../mixin/Validate.vue'
import {auth} from '../api'

export default {
  mixins: [Validate],
  data() {
    return {
      userid: '',
      password: '',
      // error: '',
      rPath: '',
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
    onSubmit(){
      auth.signup(this.userid, this.password)
        .then(data => {
          console.log(data)
          this.$router.push('/login')
        })
        .catch(err=>{
          console.log(err.data.error)
          // this.error=err.data.error
        })
    } 
  }
}
</script>

<style scoped>
.headOne {

}
.innerDiv1{
  padding-bottom: 10px;
}



</style>
