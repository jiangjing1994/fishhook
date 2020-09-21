import KemButton from './Button/index'
import KemSvgIcon from './SvgIcon/index'
import KemForm from './Form/index'
import KemTable from './Table/index'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';

const components = [
    KemButton,
    KemSvgIcon,
    KemForm,
    KemTable,


];

const install = function(Vue) {
    if (install.installed) return;
    ElementUI.install(Vue)
    Avue.install(Vue)
    components.map(component => Vue.component(component.name, component));
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    KemButton,
    KemSvgIcon,
    KemForm,
    KemTable,
};
