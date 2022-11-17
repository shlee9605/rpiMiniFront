import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAddBoard: false
  },
  mutations:{
    SET_IS_ADD_BOARD(state, toggle){
      state.isAddBoard = toggle
    }
  },
  actions:{

  },
})

export default store