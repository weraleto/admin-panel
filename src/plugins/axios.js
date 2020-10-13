import Vue from 'vue'
import axiosVue from 'axios-vue'
import {store} from './../store'


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
      responseError(error) {
        if(error.response.status!== 401) {
          let respTxt = error.response.data ? error.response.data.type : 'Что-то пошло не так. Попробуйте еще раз'
          
          Vue.prototype.$notify.error({
            'title':'Ошибка',
            'message': respTxt
          })
          return Promise.reject(error)
        } else {
  
          Vue.$http.post('/api/accounts/refresh_token', {refresh_token:store.state.refresh_token})
            .then(
              res=>{
                store.state.refresh_token = res.data.refresh_token
                Vue.$http.defaults.headers.common['Authorization'] = res.data.auth_token
                return res
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
      },
    },
  })