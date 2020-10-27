import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isAuth: false,
    access_token: null,
    refresh_token: null,
    productStatuses: {
      'published':{name:'Опубликован',t:'success'},
      'under_review':{name:'На модерации',t:'warning'},
      'draft':{name:'Черновик',t:'info'},
      'approved':{name:'Подтвержден модератором',t:'success'},
      'disapproved':{name:'Отклонен модератором',t:'danger'},
    },
    loading: false
  },
  mutations: {
    setLoading (state, val) {
      state.loading = val
    }
  }
})