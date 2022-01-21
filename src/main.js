import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Tacklebox from '@narrative.io/tackle-box'
import '@narrative.io/tackle-box/dist/tackle-box.css'

Vue.use(Tacklebox)
Vue.config.productionTip = false
export const bus = new Vue();
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
