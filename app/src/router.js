import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({

  routes: [
    {
      path: '/desktop',
      component: () => import('./views/desk/desktop'),
      meta: {
        title: 'desktop',
        html: 'html-native'
      },
      name: 'desktop'
    }
  ]

})

router.afterEach((routerInfo)=>{
  document.title = routerInfo.meta.title || 'totoro'
  console.log(routerInfo, 'routerInfo.meta.html')
  if(routerInfo.meta.html) {
    document.documentElement.className = routerInfo.meta.html
  } else {
    document.documentElement.className = ''
  }
})

export default router
