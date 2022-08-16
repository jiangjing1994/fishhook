let Components = require('../../components.json')
let fs = require('fs')
let render = require('json-templater/string')
let uppercamelcase = require('uppercamelcase')
let path = require('path')
let endOfLine = require('os').EOL

const OUTPUT_PATH = path.join(__dirname, '../../packages/index.js')

const IMPORT_TEMPLATE = "import {{name}} from '../packages/{{package}}/index.js';"
const INSTALL_COMPONENT_TEMPLATE = '  {{name}}'
const MAIN_TEMPLATE = `/* Automatically generated by './build/bin/build-entry.js' */

{{include}}
// import ContextMenu from './ContextMenu'
import ElementUI from 'element-ui'
import Grid from '@jiangjing94/grid'
import '@jiangjing94/grid/lib/index.css'
import './theme/index.scss'
import { isExitsVariable } from './utils'
import './utils'
const components = [
{{install}},
];

const install = function(Vue, opts = {}) {

  if (install.installed) return

  components.forEach((component) => Vue.component(component.name, component))

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

  // ContextMenu.install(Vue)
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '{{version}}',
  install,
{{list}}
};
`

delete Components.font

let ComponentNames = Object.keys(Components)

let includeComponentTemplate = []
let installTemplate = []
let listTemplate = []

ComponentNames.forEach((name) => {
  let componentName = 'Kem' + uppercamelcase(name)

  includeComponentTemplate.push(
    render(IMPORT_TEMPLATE, {
      name: componentName,
      package: name,
    })
  )

  if (['Loading'].indexOf(componentName) === -1) {
    installTemplate.push(
      render(INSTALL_COMPONENT_TEMPLATE, {
        name: componentName,
        component: name,
      })
    )
  }

  if (componentName !== 'Loading') listTemplate.push(`  ${componentName}`)
})

let template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  version: process.env.VERSION || require('../../package.json').version,
  list: listTemplate.join(',' + endOfLine),
})

fs.writeFileSync(OUTPUT_PATH, template)
console.log('[build entry] DONE:', OUTPUT_PATH)
