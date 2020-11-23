import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// @ts-ignore
import KemUI from "../packages";

// import "../../packages/theme-default/lib/index.css";
Vue.config.productionTip = false;

Vue.use(KemUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
