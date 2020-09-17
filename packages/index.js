import KemButton from './Button/index'
import KemForm from './Form/index'


const components = [
    KemButton,
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
    KemForm,
};
