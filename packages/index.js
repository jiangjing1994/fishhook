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
import KemCrud from './Crud'
import KemChooseArrayElement from './ChooseArrayElement'
import KemSearch from './Search'
import KemInputPassWord from './InputPassWord'
import KemDatePicker from './DatePicker'
import ElementUI from "element-ui";
import "./theme/index.css";
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import { Tree as KemViewTree , Alert as KemViewAlert} from 'view-design';
import 'view-design/dist/styles/iview.css';

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
    KemCrud,
    KemSearch,
    KemInputPassWord,
    KemDatePicker,


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
    Vue.component('KemViewTree', KemViewTree);
    Vue.component('KemViewAlert', KemViewAlert);
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
    KemCrud,
    KemSearch,
    KemInputPassWord,
    KemDatePicker,
};
