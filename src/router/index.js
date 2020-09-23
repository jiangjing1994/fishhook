import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import pages from '../views/demo/pages' // 页面文件目录


let routes = [];

Object.keys(pages).forEach(item=>{

  routes.push({

    path: `/${pages[item].name}`,

    name: pages[item].name,

    component: pages[item]

  })

});

console.log(444)
console.log(routes)

Vue.use(VueRouter);



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes:[
    ...routes,
    {
      path: "/",
      name: "Home",
      component: Home
    },

  ]
});

export default router;
