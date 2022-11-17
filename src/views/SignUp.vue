<template>
  <div>
   <div class="login">
    <v-col cols="60" xs="60" sm="40" md="40" lg="40" class="ma-auto">
    <h1 class="headOne">참참참 회원가입하기</h1>
    <ValidationObserver
      ref="signUpForm"
      v-slot="{ handleSubmit, invalidForm, validate }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <div class = "innerDiv1">
      <ValidationProvider
        name="아이디" rules="required|userid" v-slot="{errors}">
          <v-text-field 
            v-model="userid"
            :counter="20"
            :error-messages="errors"
            label="아이디 입력"
            required
          ><v-icon>mdi-account</v-icon></v-text-field> 
          </ValidationProvider>
      </div>
      
      <div class = "innerDiv2">
      <ValidationProvider
          name="비밀번호" rules="required|min:6" v-slot="{errors}">
          <v-text-field
            v-model="password"
            type="password"
            :counter="13"
            :error-messages="errors"

            label="비밀번호 입력"
            required
          ></v-text-field> 
          </ValidationProvider>
      </div>
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
