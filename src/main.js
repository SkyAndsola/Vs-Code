//插件引入
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//轮播
import swiper from 'vue-awesome-swiper'
import "swiper/dist/css/swiper.css"
Vue.use(swiper)
//rem
import "./js/rem.js"
//jq
import $ from 'jquery'

//	Validator.extend('phone', {
//		messages: {
//  		zh_CN:field => '请输入正确的电话号码'
//		},
//		validate: value => {
//  		return /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value);
//		}
//	}),
//	Validator.extend('pwd', {
//		messages: {
//  		zh_CN:field => '请输入6-16位密码'
// 		 },
//		validate: value => {
//  		return /^\w{6,16}$/.test(value);
//		}
//	})
// },
// 
//)
//node
import axios from 'axios'
Vue.prototype.http = axios
   Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



//错误提示
//const dictionary = {
//zh_CN: {
//  messages: {
//    phone: () => '请输入正确的电话号码',
//    pwd: () => '请输入6-16位密码'
//  }
//}
//};
//Validator.updateDictionary(dictionary);
//自定义规则

