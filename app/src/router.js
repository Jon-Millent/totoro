import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({

  routes: [
    {
      path: '/',
      redirect: '/desktop',
    },
    {
      path: '/initialization',
      component: () => import('./views/desk/initialization'),
      meta: {
        title: 'initialization',
        html: 'html-native'
      },
      name: 'initialization'
    },
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
  if(routerInfo.meta.html) {
    document.documentElement.className = routerInfo.meta.html
  } else {
    document.documentElement.className = ''
  }
})

router.beforeEach((to, form, next)=>{
  let init = window.totoroNative.getItem('init')
  if(!init) {
    if(to.name !== 'initialization') {
      router.replace('/initialization')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
