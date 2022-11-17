<template>
	<v-app>
    <Navbar /> 
		<v-main class="mainBackground">
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: { Navbar },
  data () {
    return {
    }
  },
  created(){

  },
  computed:{

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
