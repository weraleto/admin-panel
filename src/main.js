import Vue from 'vue'
import App from './App.vue'
import {store} from './store'
import {router} from './router'

// plugins
import './plugins/axios.js'
import './plugins/vee-validate.js'
import './plugins/element-ui.js'


// styles
import './assets/sass/style.sass'

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)





new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),

})
