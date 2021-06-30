import KemButton from '../packages/Button'
import KemSvgIcon from '../packages/SvgIcon'
import KemForm from '../packages/Form'
import KemSelect from '../packages/Select'
import KemInput from '../packages/Input'
import KemDialog from '../packages/Dialog'
import KemLabelText from '../packages/LabelText'
import KemTable from '../packages/Table'
import KemPageCard from '../packages/PageCard'
import KemInputNumber from '../packages/InputNumber'
import KemCheckboxGroup from '../packages/CheckboxGroup'
import KemRadioboxGroup from '../packages/RadioboxGroup'
import KemColorPicker from '../packages/ColorPicker'
import KemDataView from '../packages/DataView'
import KemInputColor from '../packages/InputColor'
import KemTimeline from '../packages/Timeline'
import KemSwitch from '../packages/Switch'
import KemCountUp from '../packages/CountUp'
import KemDataIcons from '../packages/DataIcons'
import KemInputSlider from '../packages/InputSlider'
import KemTree from '../packages/Tree'
import KemSteps from '../packages/Steps'
import KemCrud from '../packages/Crud'
import KemChooseArrayElement from '../packages/ChooseArrayElement'
import KemSearch from '../packages/Search'
import KemInputPassWord from '../packages/InputPassWord'
import KemDatePicker from '../packages/DatePicker'
 import KemTransfer from '../packages/Transfer'
import KemTag from '../packages/Tag'
import KemTagGroup from '../packages/TagGroup'
import KemRangePicker from '../packages/RangePicker'
import KemIcon from '../packages/Icon'
import ElementUI from 'element-ui'
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import { Tree as KemViewTree, Alert as KemViewAlert, Icon as KemViewIcon , Checkbox as KemViewCheckbox } from 'view-design'
import 'view-design/dist/styles/iview.css'
import '../packages/theme/index.scss'

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
  KemSteps,
  KemChooseArrayElement,
  KemCrud,
  KemSearch,
  KemInputPassWord,
  KemDatePicker,
   KemTransfer,
  KemTag,
  KemTagGroup,
  KemRangePicker,
  KemIcon,

]

const install = function (Vue, opts = {}) {
  if (install.installed) return

  components.map((component) => Vue.component(component.name, component))

  const size = opts.size || 'mini'
  const basestyles = ({ rowIndex }) => {
    if (rowIndex % 2 === 0) {
      return {
        backgroundColor: '#f7f7f7',
      }
    }
  }
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
      rowStyle: opts['Table']?.rowStyle || basestyles,
      pageOption: opts['Table']?.pageOption || {
        pageSizes: [5, 10, 20, 50],
        pageSize: 20,
      },
      defaultProps: opts['Table']?.defaultProps || {
        currentPage: 'pageNo',
        pageSize: 'pageSize',
        order: 'order',
        prop: 'prop',
        total: 'page_size',
        data: 'data',
      },
      orderProps: opts['Table']?.orderProps || {
        ascending: 'ascending',
        descending: 'descending',

      },
      mergeOption: opts['Table']?.mergeOption || {},
    },
    Form: {
      formConfig: {
        labelWidth: '120px',
        labelPosition: 'right',
        size,
        ...opts['Form']?.formConfig,
      },
      rowGutter: opts['Form']?.rowGutter || 0,

    },
    Tag: {
      size: opts.Tag?.size || size,
    },
    Tree: {
      arrow: opts.tree ? opts.tree.arrow ? opts.tree.arrow : '' : '',
      customArrow: opts.tree ? opts.tree.customArrow ? opts.tree.customArrow : '' : '',
      arrowSize: opts.tree ? opts.tree.arrowSize ? opts.tree.arrowSize : '' : ''
    },

    // 输入组件
    Input:{
      clearable: opts['Input']?.clearable || true,
    }
  }

  ElementUI.install(Vue, {
    size: opts.size,
  })
  Avue.install(Vue, {
    size: opts.size,
  })
  Vue.component('KemViewTree', KemViewTree)
  Vue.component('KemViewAlert', KemViewAlert)
  Vue.component('KemViewIcon', KemViewIcon)
  Vue.component('KemViewCheckbox', KemViewCheckbox)

  Vue.component('KemTree', KemTree)
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
  KemSteps,
  KemChooseArrayElement,
  KemCrud,
  KemSearch,
  KemInputPassWord,
  KemDatePicker,
   KemTransfer,
  KemTag,
  KemTagGroup,
  KemRangePicker,
  KemIcon,


}
