import KemButton from './Button'
import KemTable from './Table'
import KemForm from './Form'
import KemPageCard from './PageCard'
import Vue from "vue";

const libComponents = {
    KemButton,
    KemTable,
    KemForm,
    KemPageCard,
}

Object.keys(libComponents).forEach(item=>{
    Vue.component(item,libComponents[item])
})

export default libComponents


