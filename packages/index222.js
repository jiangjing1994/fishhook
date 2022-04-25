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
import KemResizeBox from './ResizeBox'
//import KemTree from './Tree'
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
import KemRangePicker from './RangePicker'
import KemIcon from './Icon'
import KemJsxForm from './JsxForm'
import KemD52tButton from './D52tButton'
import KemSelectTree from './SelectTree'
import KemInputTree from './InputTree'
import KemFlipNnumber from './FlipNnumber'
import ContextMenu from './ContextMenu'
import ElementUI from 'element-ui'
import Grid from '@jiangjing94/grid'
import '@jiangjing94/grid/lib/index.css'
import './theme/index.scss'
import { isExitsVariable } from './utils'
import './utils'

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
  KemResizeBox,
  KemSteps,
  KemChooseArrayElement,
  KemCrud,
  KemSearch,
  KemInputPassWord,
  KemDatePicker,
  KemSuperFlow,
  KemTransfer,
  KemTag,
  KemTagGroup,
  KemRangePicker,
  KemIcon,
  KemD52tButton,
  KemSelectTree,
  KemInputTree,
  KemFlipNnumber,
  KemJsxForm,
]

const install = function (Vue, opts = {}) {
  if (install.installed) return

  components.map((component) => Vue.component(component.name, component))

  const SIZE = opts.size || 'mini'
  const tableRowStyle = ({ rowIndex }) => {
    if (rowIndex % 2 === 0) {
      return {
        backgroundColor: '#f7f7f7',
      }
    }
  }
  Vue.prototype.$MIMI = {
    SIZE,
    buttonSize: opts.buttonSize || 'mini',
    menuType: opts.menuType || 'text',
    Button: {
      size: opts.Button?.size || SIZE,
      type: opts.Button?.type || 'primary',
      wait: opts.Button?.wait || 1000,
      customButtonConfig: opts.Button?.customButtonConfig || false,
    },
    Table: {
      size: opts['Table']?.size || SIZE,
      type: opts['Table']?.type || 'primary',

      isShowIndex: isExitsVariable(opts['Table']?.isShowIndex) ? opts['Table']?.isShowIndex : true,
      isShowHeader: isExitsVariable(opts['Table']?.isShowHeader) ? opts['Table']?.isShowHeader : true,
      isShowBorder: isExitsVariable(opts['Table']?.isShowBorder) ? opts['Table']?.isShowBorder : true,
      isShowStripe: isExitsVariable(opts['Table']?.isShowStripe) ? opts['Table']?.isShowStripe : false,

      selection: opts['Table']?.selection || false,
      indexLabel: opts['Table']?.indexLabel || '序号',
      align: opts['Table']?.align || 'center',
      menuWidth: opts['Table']?.menuWidth || 200,
      rowStyle: opts['Table']?.rowStyle || tableRowStyle,
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
        SIZE,
        ...opts['Form']?.formConfig,
      },
      labelStyle: {
        ...opts['Form']?.labelStyle,
      },
      rowGutter: opts['Form']?.rowGutter || 0,
      labelSuffix: opts['Form']?.labelSuffix || '',
    },
    Tag: {
      size: opts.Tag?.size || SIZE,
    },
    LabelText: {
      labelStyle: {
        ...opts['LabelText']?.labelStyle,
      },
    },
    Tree: {
      arrow: opts.tree ? (opts.tree.arrow ? opts.tree.arrow : '') : '',
      customArrow: opts.tree ? (opts.tree.customArrow ? opts.tree.customArrow : '') : '',
      arrowSize: opts.tree ? (opts.tree.arrowSize ? opts.tree.arrowSize : '') : '',
    },
    // 输入组件
    Input: {
      clearable: isExitsVariable(opts['Input']?.clearable) ? opts['Input']?.clearable : true,
    },
  }

  ElementUI.install(Vue, {
    size: opts.size,
  })
  Grid.install(Vue, {
    size: opts.size,
  })
  ContextMenu.install(Vue)

  // Vue.component('KemViewTree', KemViewTree)
  // Vue.component('KemViewAlert', KemViewAlert)
  // Vue.component('KemViewIcon', KemViewIcon)
  // Vue.component('KemViewCheckbox', KemViewCheckbox)

  //Vue.component('KemTree', KemTree)
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
  KemResizeBox,
  KemSteps,
  KemChooseArrayElement,
  KemCrud,
  KemSearch,
  KemInputPassWord,
  KemDatePicker,
  KemSuperFlow,
  KemTransfer,
  KemTag,
  KemTagGroup,
  KemRangePicker,
  KemIcon,
  KemD52tButton,
  KemSelectTree,
  KemInputTree,
  KemFlipNnumber,
  KemJsxForm,
}
