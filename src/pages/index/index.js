import Vue from 'vue';
import App from './index.vue';

Vue.config.productionTip = false;

new Vue({
  el: '.main',
  template: '<App/>',
  components: { App }
});