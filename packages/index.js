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
import KemRadioboxGroup from './RadioboxGroup'
import KemColorPicker from './ColorPicker'
import KemDataView from './DataView'
import KemInputColor from './InputColor'
import KemTimeline from './Timeline'
import KemSwitch from './Switch'
import KemCountUp from './CountUp'
import KemDataIcons from './DataIcons'
import KemInputSlider from './InputSlider'
import KemFormDialog from './FormDialog'
import KemTree from './Tree'
import KemSteps from './Steps'
import KemChooseArrayElement from './ChooseArrayElement'
import KemCrudDialog from './CrudDialog'
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
    KemRadioboxGroup,
    KemColorPicker,
    KemDataView,
    KemInputColor,
    KemTimeline,
    KemSwitch,
    KemCountUp,
    KemDataIcons,
    KemInputSlider,
    KemTree,
    KemSteps,
    KemChooseArrayElement,
    KemFormDialog,


];

const install = function(Vue,opts = {}) {
    if (install.installed) return;

    components.map(component => Vue.component(component.name, component));

    Vue.prototype.$MIMI = {

        size: opts.size || 'small',
        tableSize: opts.tableSize || 'small',
        formSize: opts.formSize || 'small',
        buttonSize: opts.buttonSize || 'mini',
        menuType: opts.menuType || 'text',

    };

    ElementUI.install(Vue,{
        size: opts.size || 'small'
    })
    Avue.install(Vue,
    {
        size: opts.size || 'small'
    })

    KemCrudDialog.install(Vue)
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
    KemRadioboxGroup,
    KemColorPicker,
    KemDataView,
    KemInputColor,
    KemTimeline,
    KemSwitch,
    KemCountUp,
    KemDataIcons,
    KemInputSlider,
    KemTree,
    KemSteps,
    KemChooseArrayElement,
    KemFormDialog,
};
