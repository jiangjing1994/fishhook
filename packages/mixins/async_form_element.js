import {get, isExitsVariable} from '../utils'
export default {
  data() {
    return {
      data: [],
    }
  },
  props: {
    /**
     * 字段映射默认label value
     */
    defaultProps: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value',
        }
      },
    },

    /**
     * 选项列表
     */
    options: {
      type: Array,
    },

    /**
     * ui类型
     * @values normal , text
     */
    uiType: {
      type: String,
      default: 'normal',
    },

    /**
     * 异步方法 Promise Function
     */
    request: {
      type: Function,
    },

    /**
     * 结果处理 Function
     */
    result: {
      type: Function,
    },

    /**
     * 默认参数 用于request 入参
     */
    defaultParams: {
      type: Object,
      default: () => {
        return {}
      },
    },

    /**
     * 自动选择第一个值request下生效
     */
    autoSelect: {
      type: Boolean,
      default: false,
    },

    /**
     * options改变是否把value清零
     */
    valueClear: {
      type: Boolean,
      default: false,
    },

    /**
     * 清空 $MIMI.Input
     */
    clearable: {
      type: Boolean,
      default:undefined
    },
  },
  computed: {
    inputClearable() {
      return  isExitsVariable(this.clearable) ? this.clearable : this.$MIMI.Input.clearable
    },
    list() {
      const { label, value } = this.defaultProps
      let options = this.isService ? this.data : this.options

      if (!label || !value){
        return options.map((item) => {
          return {
            label:item,
            value:item,
          }
        })

      }

      return options.map((item) => {
        return {
          ...item,
          label:get(item,label),
          value:get(item,value),
        }
      })
    },
    evet() {
      if (this.$listeners.input) {
        this.$listeners.input = (value) => {
          if (!this.multiple) {
            this.$emit('input', value)
          } else {
            if (this.valueDataType === 'string' && this.separator) {
              this.$emit('input', value.join(this.separator))
            } else {
              this.$emit('input', value)
            }
          }
        }
      }
      return this.$listeners
    },

    isService() {
      return !!this.request
    },
    label() {
      const list = this.list

      let filterArr = list.filter((item) => {
        return item.value === this.$attrs.value
      })

      if (filterArr instanceof Array && filterArr.length > 0) {
        return filterArr[0].label
      } else {
        return ''
      }
    },
  },
  created() {
    if (this.isService) {
      this.getListData()
    } else {
      // 非reques模式 自动赋初始值
      let data = this.options
      this.initialValue(data)
    }
  },
  watch: {
    defaultParams: {
      handler() {
        if (this.isService) {
          if (this.valueClear) {
            this.$attrs.value = null
            this.$emit('input', null)
          }
          this.getListData()
        }
      },
      deep: true,
    },
  },
  methods: {
    async getListData(params = {}) {
      const defaultParams = this.defaultParams

      const request = this.request

      if (request) {
        const res = await request({
          ...defaultParams,
          ...params,
        })

        let data = res

        const result = this.result

        if (result) {
          data = (await result(res)) || []
        }

        this.data = data
        this.initialValue(data)
      } else {
        throw new Error(`Need request !!!!!!!`)
      }
    },
    initialValue(data) {
      if (this.autoSelect && data instanceof Array && data.length > 0) {
         let value = get(data[0],this.defaultProps['value'])
        if (this.dataType === 'Array') {
          value = [value]
        }

        this.$attrs.value = value
        this.$emit('input', value)
      }
    },
  },
}
