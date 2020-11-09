import Vue from 'vue'
import App from './App.vue'
import router from "@/router";  //index可以省略

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
