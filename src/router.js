import Vue from 'vue'
import VueRouter from 'vue-router'
import {store} from './store'

Vue.use(VueRouter)

import Auth from './components/Auth'
import AddItem from './components/AddItem'
import Balance from './components/Balance'
import Settings from './components/Settings'
import CliBase from './components/itemList'
import CliInfo from './components/CliInfo'
import AdminItem from './components/adminSingleItem.vue'
import Welcome from './components/Welcome'
import Forgot from './components/ResetPassReq'
import ChangePass from './components/ResetPassRes'


export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path:'/auth', name:'auth', component: Auth}, //авторизация
    {path:'/reg', name:'reg', component: Settings}, // регистрация 
    

    {path:'/welcome', name:'welcome', component: Welcome}, // регистрация завершена
    {path:'/email-success', name:'email', component: Welcome}, // почта подтверждена
    
    {path:'/forgot-pass/reset', name:'respass', component: Forgot}, //запрос на сброс пароля
    {path:'/forgot-pass/change', name:'changepass', component: ChangePass}, //изменить забытый пароль 
    
    // руты доступные только с авторизацией
    {path:'/add', name:'add', component: AddItem}, // добавить элемент
    {path:'/balance', name:'balance', component: Balance}, // баланс
    {path:'/settings', name:'settings', component: Settings}, // изменить данные 
    {path:'/settings/pass', name:'authpass', component: ChangePass}, // изменить данные 
    {path:'/base', name:'client-base', component: CliBase}, // список товаров


    {path:'/item/:id', name:'item-user-info', component: CliInfo}, // товар
    {path:'/item-moderation/:id', name:'item-admin-info', component: AdminItem}, // товар для модерации
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

let noAuthRoutes = ['auth', 'reg', 'email', 'respass', 'changepass', 'welcome'];

router.beforeEach((to, from, next) => {
  
  
  if(['item-user-info','item-admin-info'].includes(to.name) && !store.state.currItemId ) {
    
    const href = window.location.href.split('/');
    store.commit('setProductId', href[href.length - 1])
  }

  if(store.state.isAuth && store.state.userRole==='seller'){
    Vue.$http.get('/api/get_shop_info')
    .then(
      res=>{res ? store.commit('setShopInfo', res.data) : ''}
    )
  }

  if(localStorage.getItem('acs_token') && !store.state.isAuth) {
      Vue.$http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('acs_token')}`
      store.state.isAuth = true;
      store.state.userRole = localStorage.getItem('role')

      
      
      if(store.state.isAuth) {
            
    
    
        if(to.path === '/') {
          router.push('/base')
        }
        else {
          router.push({name: to.name})
        }
      }
   
  }
  else if ( noAuthRoutes.indexOf(to.name) == -1 && !store.state.isAuth) next({ name: 'auth' })
  else next()
})