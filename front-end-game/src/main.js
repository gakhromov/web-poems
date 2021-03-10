import Vue from 'vue'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$back = "http://localhost:9000";

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
