import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// @ts-ignore
import KemUI from '../packages'
 //import '../packages/theme/index.scss'
//import './style/index.scss'
 Vue.config.productionTip = false

Vue.use(KemUI, {
  size: 'mini',
  Button: {
    size: 'mini',
  },
  Form: {
    labelSuffix: ':',
  },
  Table:{
    align: "left",
    isShowIndex: false,
    isShowStripe: false,
    isShowBorder: false,
    isShowHeader: false,
    indexLabel: "序 号",
    mergeOption: {
      indexWidth: 100,

     },
    pageOption: {
      pageSizes: [5, 10, 20, 50],
      pageSize: 10,
      layout: "total,pager,prev, next",
    },
  }
 })
 Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
