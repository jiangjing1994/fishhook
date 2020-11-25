import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import pages from "../views/demo/pages"; // 页面文件目录

let routes = [];

Object.keys(pages).forEach(item => {
  routes.push({
    path: `/${pages[item].name}`,

    name: pages[item].name,

    component: pages[item]
  });
});

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    ...routes,
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ]
});

export default router;
