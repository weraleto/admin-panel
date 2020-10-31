import Vue from 'vue'
import axiosVue from 'axios-vue'
import {store} from './../store'
import {router} from './../router'
import {ErrorHandler} from './errHandler'



export let refreshToken = ()=>{
  
  let token = localStorage.getItem('token')
  return Vue.$http.post('/api/accounts/refresh_token', {refresh_token: token ? token : store.state.refresh_token})
             .then(
               res=>{
                 store.state.refresh_token = res.data.refresh_token
                 store.state.userRole = res.data.role
                 store.state.isAuth = true
                 Vue.$http.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
                 localStorage.setItem('token', res.data.refresh_token)
                //  return Vue.$http.request(error.config.url);
                 return Promise.reject(err)
               }
             )
             .catch(
               err=>{
                 Vue.$http.defaults.headers.common['Authorization'] = ''
                 router.push('/auth')
                 Vue.prototype.$notify.error({
                   'title':'Ошибка',
                   'message':'Что-то пошло не так. Попробуйте авторизоваться снова.'
                 })
                 return Promise.reject(err)
               }
             )
}

Vue.use(axiosVue, {
    globalDefaults: {
      baseURL: 'https://dizi.foresco.site/',
      // headers: {
      //   common: {
      //     Authorization: ''
      //   }
      // }
    },
    interceptors: {
      request(config) {
        store.commit('setLoading', true)
        return config
      },
      response(response) {
        store.commit('setLoading', false)
        return response
      },
      responseError(error) {
        store.commit('setLoading', false)
        
        if(error.response.status=== 500) store.commit('setLoading', false)
        if(error.response.status!== 401) {
          let respTxt = error.response.data ? ErrorHandler[error.response.data.type] : 'Что-то пошло не так. Попробуйте еще раз'
          
          Vue.prototype.$notify.error({
            'title':'Ошибка',
            'message': respTxt
          })
          return Promise.reject(error)
        } else if(error.response.status === 401) {

          refreshToken()
            
          }else {
            Vue.$http.defaults.headers.common['Authorization'] = ''
                  router.push('/auth')
                  Vue.prototype.$notify.error({
                    'title':'Ошибка',
                    'message':'Что-то пошло не так.'
                  })
                  return Promise.reject(err)
          }
  
      },
    },
  })


