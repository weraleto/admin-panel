import Vue from 'vue'
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