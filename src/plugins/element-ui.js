import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Notification, Tag, Tooltip, MessageBox, Loading} from 'element-ui'

Vue.use(ElementUI);
Vue.component(Notification)
Vue.component(Tag)
Vue.component(Tooltip)

Vue.prototype.$notify = Notification;

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;