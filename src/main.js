import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// @ts-ignore
import KemUI from "../packages";

// import "../../packages/theme-default/lib/index.css";
Vue.config.productionTip = false;
console.log(KemUI);

Vue.use(KemUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
