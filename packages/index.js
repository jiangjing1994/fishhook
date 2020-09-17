import KemButton from './Button'
import KemTable from './Table'
import KemForm from './Form'
import KemPageCard from './PageCard'
import Vue from "vue";

const components = [
    KemButton,


]

const install = function(Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    KemButton,

}

