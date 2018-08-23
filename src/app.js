import Vue from 'vue'                            //vue
import VueRouter from 'vue-router'               //vue路由
import App from './app.vue'                      //main
import routes from './routes'                    //所有routes

import './assets/css/normalize.css'  // normalize重置浏览器样式


// import demo from '../src/static/common.js'
// Vue.use(demo)



import './util/common'

Vue.use(VueRouter)

const router = new VueRouter ({
	mode: 'hash',//history
	routes: [
		...routes,
	]
})

new Vue({
	router,
	el: "#app",
	render: h => h(App)
})
