import Vue from 'vue'
import App from './App.vue'
import totoroNative from "./util/totoroNative";
import router from './router'
import 'view-design/dist/styles/iview.css';
import { Button } from 'view-design';

Vue.config.productionTip = false

Vue.component('Button', Button);
Vue.use(totoroNative)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
