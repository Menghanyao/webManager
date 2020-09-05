import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import qs from 'qs'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios

Vue.use(ElementUI);
Vue.use(VueCookies);


new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
