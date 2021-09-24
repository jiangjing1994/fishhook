<template>
  <div>
    <KemLabelText v-if="uiType === 'text'" :value="label" />
    <avue-input-tree
      v-else
      v-bind="$attrs"
      default-expand-all
      type="tree"
      :dic="computedOption"
      :placeholder="placeholder"
      v-on="evet"
    ></avue-input-tree>
  </div>
</template>

<script>
export default {
  name: 'KemInputTree',
  props: {
    clearable: {
      type: Boolean,
      default: true,
    },
    // 默认参数
    defaultParams: {
      type: Object,
      default: () => {
        return {}
      },
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
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
  },
  data() {
    return {
      list: [],
      data: [],
    }
  },
  computed: {
    evet() {
      if (this.$listeners.change) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.$listeners.change = (value) => {
          console.log(this.object)
          this.$emit('change', value, {
            value,
            v: this.object[value],
          })
        }
      }
      return this.$listeners
    },

    computedOption() {
      const { label, value } = this.defaultProps
      let data = this.data

      let trans = (data) => {
        data.forEach((item, index) => {
          if (item.isShow === '0') {
            item.disabled = true
          }
          item.label = item[label]
          item.value = item[value]
          item.children && trans(item.children)
        })
      }
      trans(data)
      return data
    },

    isService() {
      return !!this.request
    },

    label() {
      const { label, value } = this.defaultProps
      let data = this.data
      let v = ''
      let filterTree = (data) => {
        data.forEach((item, index) => {
          if (item[value] === this.$attrs.value) {
            v = item[label]
          }
          item.children && filterTree(item.children)
        })
      }
      filterTree(data)

      return v
    },
  },
  watch: {
    defaultParams: {
      handler() {
        if (this.isService) {
          this.getListData()
        }
      },
      deep: true,
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
    initialValue(data) {},
  },
}
</script>

<style scoped></style>
