import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import vSelect from 'vue-select'

Vue.component('v-select', vSelect)


Vue.use(VueRouter)


import Auth from './components/Auth'
import AddItem from './components/AddItem'
import Balance from './components/Balance'
import Settings from './components/Settings'
import Quiz from './components/Quiz'
import CliBase from './components/CliBase'
import CliInfo from './components/CliInfo'

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
    {path:'/', name:'client-base', component: CliBase},
    // {path:'/client/:id', name:'client-info', component: CliInfo},
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

new Vue({
  router,
  el: '#app',
  render: h => h(App),

})
