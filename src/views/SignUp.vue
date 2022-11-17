<template>
  <div style="color:azure;">
    Board 
    
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
      error: '',
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
      auth.login(this.userid, thispassword)
        .then(data => {
          console.log(data)
          this.$router.push('/login')
        })
        .catch(err=>{
          this.error=err.data.error
        })
    } 
  }
}
</script>

<style>

</style>
