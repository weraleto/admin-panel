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
  if ( noAuthRoutes.indexOf(to.name) == -1 && !store.state.isAuth) next({ name: 'auth' })
  else next()
})