import KemButton from './Button'
import KemSvgIcon from './SvgIcon'
import KemForm from './Form'
import KemSelect from './Select'
import KemInput from './Input'
import KemDialog from './Dialog'
import KemLabelText from './LabelText'
import KemTable from './Table'
import KemPageCard from './PageCard'
import KemInputNumber from './InputNumber'
import KemCheckboxGroup from './CheckboxGroup'
import KemColorPicker from './ColorPicker'
import KemDataView from './DataView'
import KemInputColor from './InputColor'
import KemTimeline from './Timeline'
import KemSwitch from './Switch'
import KemCountUp from './CountUp'
import KemDataIcons from './DataIcons'
import KemInputSlider from './InputSlider'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';

const components = [
    KemButton,
    KemSvgIcon,
    KemForm,
    KemDialog,
    KemTable,
    KemLabelText,
    KemPageCard,
    KemSelect,
    KemInput,
    KemInputNumber,
    KemCheckboxGroup,
    KemColorPicker,
    KemDataView,
    KemInputColor,
    KemTimeline,
    KemSwitch,
    KemCountUp,
    KemDataIcons,
    KemInputSlider,


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
    KemDialog,
    KemTable,
    KemLabelText,
    KemPageCard,
    KemSelect,
    KemInput,
    KemInputNumber,
    KemCheckboxGroup,
    KemColorPicker,
    KemDataView,
    KemInputColor,
    KemTimeline,
    KemSwitch,
    KemCountUp,
    KemDataIcons,
    KemInputSlider,
};
