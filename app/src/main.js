import Vue from 'vue'
import App from './App.vue'
import totoroNative from "./util/totoroNative";
import Database from "./util/database";
import router from './router'

import ViewTool from './util/view'

import {
  ContentMenu,
  ContentMenuGroup,
  ContentMenuItem,
  DesktopBox,
  Docker,
  StatusBar,
  SbTime,
  Draggable
} from './components/index'

// 桌面应用不考虑按需加载
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'csshake'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(totoroNative)
Vue.use(Database)
Vue.use(ViewTool)

console.log(ContentMenu, 'ContentMenu')

// 这样写是为了ide的代码提示
Vue.component(ContentMenu.name, ContentMenu)
Vue.component(ContentMenuGroup.name, ContentMenuGroup)
Vue.component(ContentMenuItem.name, ContentMenuItem)
Vue.component(DesktopBox.name, DesktopBox)
Vue.component(Docker.name, Docker)
Vue.component(StatusBar.name, StatusBar)
Vue.component(SbTime.name, SbTime)
Vue.component(Draggable.name, Draggable)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
