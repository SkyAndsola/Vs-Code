//路由，定义的同时通常把值也写出来
import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import menu from '@/components/menu'
import shop from '@/components/shop'
import me from '@/components/me'
import detail from '@/components/detail'
import login from '@/components/login'
import register from '@/components/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/menu:id',
      name: 'menu',
      component: menu
    },
     {
      path: '/shop:id',
      name: 'shop',
      component: shop
    },
      {
      path: '/me:id',
      name: 'me',
      component: me
    },
    {
      path: '/detail:id',
      name: 'detail',
      component: detail
    },
	 {
	  path: '/login',
	  name: 'login',
	  component: login
	},
	{
	  path: '/register',
	  name: 'register',
	  component: register
	}     
  ]
})
