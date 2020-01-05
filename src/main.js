import Vue from 'vue'
import App from './App.vue'
import VueScrollReveal from 'vue-scroll-reveal';
import VueScrollTo from 'vue-scrollto';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import router from './routes';
import store from './store/store';
import moment from 'moment'
import vuelidate from 'vuelidate';
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'
import VueMask from 'v-mask'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'


Vue.use(VueRouter)
Vue.use(VueScrollTo)
Vue.use(vuelidate)
Vue.use(VueMask);

Vue.use(VueNoty,{
  timeout: 2000,
  progressBar: true,
  layout: 'topRight'
})


//Animação
Vue.use(VueScrollReveal,{
  duration:1000,
  scale:1,
  distance:'50px'
})

Vue.use(VueResource);
// Vue.http.options.root = 'https://elobrotherapi.herokuapp.com';
Vue.http.options.root = 'http://localhost:3000';

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

Vue.config.productionTip = false

Vue.prototype.moment = moment

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
