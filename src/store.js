import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isAuth: false,
    access_token: null,
    refresh_token: null
  },
  mutations: {
    // increment (state) {
    //   state.count++
    // }
  }
})