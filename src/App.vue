<template>
	<v-app>
    <Navbar /> 
		<v-main class="mainBackground">
			<router-view></router-view>
		</v-main>
		<div v-if="isState"></div>
		<div v-else></div>
	</v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: { Navbar },
  data () {
    return {
		state: ''
    }
  },
  created(){
	this.state=localStorage.getItem('token')
	console.log(this.state)
  },
  computed:{
	isState(){
		this.state=localStorage.getItem('token')
		console.log(this.state)
	}
  }
}
</script>

<style>
.mainBackground {
	background: url('assets/main3.png');
	background-size: 70%;
	background-color: black;
}
</style>
