import Directives from './directives.js'
const install = function (Vue) {
  Vue.directive('resize', Directives)
}

Directives.install = install
export default Directives
