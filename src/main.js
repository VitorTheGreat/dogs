import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import axios from "axios";
import VueSweetalert2 from 'vue-sweetalert2';
import 'bootstrap/scss/bootstrap.scss';
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

axios.defaults.baseURL = "https://dog.ceo/api";

Vue.prototype.$http = axios;
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
