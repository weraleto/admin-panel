import Vue from 'vue'
import VueRouter from 'vue-router'
import {store} from './store'

Vue.use(VueRouter)

import Auth from './components/Auth'
import AddItem from './components/AddItem'
import Balance from './components/Balance'
import Settings from './components/Settings'
import CliBase from './components/CliBase'
import CliInfo from './components/CliInfo'
import Welcome from './components/Welcome'
import Forgot from './components/ResetPassReq'
import ChangePass from './components/ResetPassRes'


export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path:'/auth', name:'auth', component: Auth},
    {path:'/add', name:'add', component: AddItem},
    {path:'/reg', name:'reg', component: Settings},
    {path:'/balance', name:'balance', component: Balance},
    {path:'/settings', name:'settings', component: Settings},
    {path:'/base', name:'client-base', component: CliBase},

    {path:'/welcome', name:'welcome', component: Welcome},
    {path:'/email-success', name:'email', component: Welcome},
    
    {path:'/forgot-pass/reset', name:'respass', component: Forgot},
    {path:'/forgot-pass/change', name:'changepass', component: ChangePass},

    {path:'/item/:id', name:'client-info', component: CliInfo},
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