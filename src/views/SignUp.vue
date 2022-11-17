<template>
  <div class="signUp">
   <div>
    <h1 class="headOne">참참참 회원가입하기</h1>
    <div class="lineContainer">
    <ValidationObserver
      ref="signUpForm"
      v-slot="{ handleSubmit, invalidForm, validate }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <div class = "innerDiv1">
      <ValidationProvider
        name="아이디" rules="required" v-slot="{errors}">
          <v-text-field 
            v-model="userid"
            :counter="20"
            :error-messages="errors"
            label="아이디 입력"
            required
          ><v-icon>mdi-account</v-icon></v-text-field> 
          </ValidationProvider>
      </div>
      
      <div class = "innerDiv1_2">
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
      <div class = "innerDiv2">
      <button  class="btn" 
       :disabled="invalidForm || !validate" type="submit"> SignUp </button>
      </div>
    </form>
    </ValidationObserver>
    </div>
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
      rPath: '',
    }
  },

  computed: {   //invalid id/pw
      invalidForm() {
          return !this.userid || !this.password
      }
  },
	created() {   //create redirect router path
    this.rPath = this.$route.query.rPath || '/'
  },
  methods: {
    onSubmit(){   //signup
      auth.signup(this.userid, this.password)
        .then(data => {
          console.log(data)
          this.$router.push('/login')   //redirect to login
        })
        .catch(err=>{
          console.log(err.data.error)
        })
    } 
  }
}
</script>

<style scoped>
.headOne{
  padding-top: 20px;
}

.signUp {
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
.innerDiv1{
  padding-top: 120px;
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




</style>
