import Vue from 'vue'
import router from './router'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import AOS from 'aos'
import 'aos/dist/aos.css'


Vue.config.productionTip = false;

Vue.prototype.$back = "http://localhost:9000";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

let app = new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

app.AOS = new AOS.init({disable: "phone"});
