import Vue from 'vue'
import router from './routes'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'

import * as VeeValidate from 'vee-validate';

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  VeeValidate,
  render: h => h(App)
})
