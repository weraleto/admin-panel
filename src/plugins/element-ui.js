import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Notification, Tag, Tooltip, MessageBox, Loading, ColorPicker } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// configure language
locale.use(lang)

Vue.use(ElementUI);
Vue.component(Notification)
Vue.component(Tag)
Vue.component(Tooltip)
Vue.component(ColorPicker)

Vue.prototype.$notify = Notification;

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;