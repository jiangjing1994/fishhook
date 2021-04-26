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
import KemSuperFlow from './SuperFlow'
import KemTransfer from './Transfer'
import KemTag from './Tag'
import KemTagGroup from './TagGroup'
import Umytable from 'umy-table'
import 'umy-table/lib/theme-chalk/index.css';// 引入样式
import ElementUI from 'element-ui'
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import './theme/index.css'
import { Tree as KemViewTree, Alert as KemViewAlert } from 'view-design'
import 'view-design/dist/styles/iview.css'


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
  KemSuperFlow,
  KemTransfer,
  KemTag,
  KemTagGroup,

]

const install = function (Vue, opts = {}) {
  if (install.installed) return

  components.map((component) => Vue.component(component.name, component))

  const size = opts.size || 'mini'
  Vue.prototype.$MIMI = {
    size,
    buttonSize: opts.buttonSize || 'mini',
    menuType: opts.menuType || 'text',
    Button: {
      size: opts.Button?.size || size,
      type: opts.Button?.type || 'primary',
      wait: opts.Button?.wait || 1000,
      customButtonConfig: opts.Button?.customButtonConfig || false,
    },
    Table: {
      size: opts['Table']?.size || size,
      type: opts['Table']?.type || 'primary',
      isShowIndex: opts['Table']?.isShowIndex || true,
      isShowHeader: opts['Table']?.isShowHeader || true,
      isShowStripe: opts['Table']?.isShowStripe || true,
      isShowBorder: opts['Table']?.isShowBorder || true,
      selection: opts['Table']?.selection || false,
      indexLabel: opts['Table']?.indexLabel || '序号',
      align: opts['Table']?.align || 'center',
      menuWidth: opts['Table']?.menuWidth || 200,
      pageOption: opts['Table']?.pageOption || {
        pageSizes: [5, 10, 20, 50],
        pageSize: 20,
      },
    },
    Form: {
      formConfig: {
        labelWidth: '120px',
        labelPosition: 'right',
        size,
        ...opts['Form']?.formConfig,
      },
    },
    Tag: {
      size: opts.Tag?.size || size,
    },
    // Dialog: {
    //   size: opts.width?.size || size,
    // },
  }

  ElementUI.install(Vue, {
    size: opts.size,
  })
  Avue.install(Vue, {
    size: opts.size,
  })
  Umytable.install(Vue)
  Vue.component('KemViewTree', KemViewTree)
  Vue.component('KemViewAlert', KemViewAlert)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
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
  KemSuperFlow,
  KemTransfer,
  KemTag,
  KemTagGroup,


}
