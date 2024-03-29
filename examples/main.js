import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import './style/index.scss'

// @ts-ignore
import FishhookUI from '../packages'
import DemoDlock from './components/demo-block'

Vue.use(FishhookUI, {
  size: 'mini',
  Button: {
    size: 'mini',
  },
  Form: {
    // labelSuffix: '@',
  },
  Table: {
    align: 'left',
    isShowIndex: false,
    isShowStripe: false,
    isShowBorder: false,
    // isShowHeader: false,
    indexLabel: '序 号',
    mergeOption: {
      indexWidth: 100,
    },
    pageOption: {
      pageSizes: [5, 10, 20, 50],
      pageSize: 10,
      layout: 'total,pager,prev, next',
    },
  },
})
Vue.config.productionTip = false
Vue.component('DemoDlock', DemoDlock)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
