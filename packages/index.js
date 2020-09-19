import KemButton from './Button/index'
import KemSvgIcon from './SvgIcon/index'
import KemForm from './Form/index'


const components = [
    KemButton,
    KemSvgIcon,
    KemForm,

];

const install = function(Vue) {
    if (install.installed) return;
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
};
