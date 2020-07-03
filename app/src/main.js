import Vue from 'vue'
import App from './App.vue'

import router from './router'

import 'view-design/dist/styles/iview.css';
import { Button } from 'view-design';

Vue.component('Button', Button);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
