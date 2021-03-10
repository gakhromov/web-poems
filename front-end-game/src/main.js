import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$back = "http://localhost:9000";

new Vue({
  render: h => h(App),
}).$mount('#app')
