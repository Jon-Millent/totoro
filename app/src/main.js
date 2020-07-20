import Vue from 'vue'
import App from './App.vue'
import totoroNative from "./util/totoroNative";
import Database from "./util/database";
import router from './router'

// 桌面应用不考虑按需加载
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(totoroNative)
Vue.use(Database)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
