import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {store} from './store'

import axiosVue from 'axios-vue'

import './assets/sass/style.sass'

import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

import { configure } from 'vee-validate';
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  // message: 'Введенные пароли не совпадают!'
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('v-select', vSelect)



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Notification} from 'element-ui'

Vue.use(ElementUI);
Vue.component(Notification)

Vue.prototype.$notify = Notification;


Vue.use(VueRouter)
Vue.use(axiosVue, {
  globalDefaults: {
    baseURL: 'http://89.208.87.121:4000/',
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





import Auth from './components/Auth'
import AddItem from './components/AddItem'
import Balance from './components/Balance'
import Settings from './components/Settings'
import Quiz from './components/Quiz'
import CliBase from './components/CliBase'
import CliInfo from './components/CliInfo'
import Welcome from './components/Welcome'
import Forgot from './components/ResetPass'


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path:'/auth', name:'auth', component: Auth},
    {path:'/add', name:'add', component: AddItem},
    {path:'/reg', name:'reg', component: Settings},
    {path:'/balance', name:'balance', component: Balance},
    {path:'/settings', name:'settings', component: Settings},
    {path:'/quiz', name:'quiz', component: Quiz},
    {path:'/base', name:'client-base', component: CliBase},
    {path:'/welcome', name:'welcome', component: Welcome},
    {path:'/forgot-pass', name:'respass', component: Forgot},

    // {path:'/client/:id', name:'client-info', component: CliInfo},
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),

})
