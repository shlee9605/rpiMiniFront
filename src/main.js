import Vue from 'vue'
import router from './routes'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(App)
})
