import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Notification, Tag, Tooltip} from 'element-ui'

Vue.use(ElementUI);
Vue.component(Notification)
Vue.component(Tag)
Vue.component(Tooltip)

Vue.prototype.$notify = Notification;