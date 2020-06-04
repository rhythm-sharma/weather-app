import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import Vuex from "vuex";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import axios from "axios";
import { store } from "./store";

Vue.use(Vuex);

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
