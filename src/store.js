import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isAuth: false,
    access_token: null,
    refresh_token: null,
    currItemId: null,
    productStatuses: {
      'draft':{name:'Черновик',t:'info'},
      'under_review':{name:'На модерации',t:'warning'},
      'approved':{name:'Подтвержден модератором',t:'success'},
      'disapproved':{name:'Отклонен модератором',t:'danger'},
      'placed':{name:'Опубликован',t:'success'},
      'placement_paused':{name:'Размещение товара приостановлено вручную',t:'warning'},
      'placement_paused_due_of_review':{name:'Размещение товара приостановлено ввиду того, что товар находится на проверке',t:'warning'},
      'placement_paused_due_of_disapprove':{name:'Размещение товара приостановлено ввиду того, что товар не прошел проверку',t:'warning'},
    },
    loading: false,
    shopInfo: {
      "balance": "0",
      "name": "Shop Name"
    }
  },
  mutations: {
    setLoading (state, val) {
      state.loading = val
    },
    setShopInfo (state, val) {
      state.shopInfo = val
    },
    setProductId (state, val) {
      state.currItemId = val
    }
  }
})