// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import Routes from './routes'
import './assets/css/base.css'
import 'font-awesome/css/font-awesome.css'

 
Vue.use(VueAxios, axios)
Vue.use(VueRouter)

const router = new VueRouter({
	routes: Routes,
	mode: 'history'
});


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router:router
})
