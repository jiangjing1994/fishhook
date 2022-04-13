<template>
  <div class="kem-transfer_body" :style="transferStyle">
    <div class="filter_body">
      <KemInput
        v-model="query"
        style="margin-bottom: 10px"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false"
      >
        <i slot="prefix" :class="['el-input__icon', 'el-icon-' + inputIcon]" @click="clearQuery"></i>
      </KemInput>
    </div>
    <div class="conten_body">
      <transfer-panel
        ref="rightPanel"
        v-bind="$props"
        :data="targetData"
        :selected="true"
        :default-checked="rightDefaultChecked"
        :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
        :render-content="renderContent"
        :panel-config="selectedPanel"
        @checked-change="onTargetCheckedChange"
        @clickTag="addToLeft"
      >
      </transfer-panel>

      <transfer-panel
        ref="leftPanel"
        v-bind="$props"
        :data="sourceData"
        :selected="false"
        :panel-config="notSelectedPanel"
        :default-checked="leftDefaultChecked"
        :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
        :render-content="renderContent"
        @checked-change="onSourceCheckedChange"
        @clickTag="addToRight"
      >
      </transfer-panel>
    </div>
  </div>
</template>

<script>
/**
 * @displayName KemTransfer 穿梭框
 */
import Emitter from 'element-ui/src/mixins/emitter'
import Locale from 'element-ui/src/mixins/locale'
import TransferPanel from './TransferPanel.vue'
import Migrating from 'element-ui/src/mixins/migrating'

export default {
  name: 'KemTransfer',

  components: {
    TransferPanel,
  },

  mixins: [Emitter, Locale, Migrating],

  props: {
    /** 穿梭框高度
     * @values 100%, 300px,
     */
    height: {
      type: [String, Number],
      default: '100%',
    },

    /** 面板配置左
     * @param {string} label 标签名
     * @param {boolean} count 是否显示计数
     * @param {boolean} countStyle 基数区域样式
     * @param {boolean} labelStyle 标签区域样式
     */
    selectedPanel: {
      type: Object,
      default: () => {
        return {
          label: '已选字段',
          count: true,
          countStyle: {},
          labelStyle: {},
        }
      },
    },
    /** 面板配置左
     * @param {string} label 标签名
     * @param {boolean} count 是否显示计数
     * @param {boolean} countStyle 基数区域样式
     * @param {boolean} labelStyle 标签区域样式
     */
    notSelectedPanel: {
      type: Object,
      default: () => {
        return {
          label: '可选字段',
          count: true,
          countStyle: {},
          labelStyle: {},
        }
      },
    },
    data: {
      type: Array,
      default() {
        return []
      },
    },
    titles: {
      type: Array,
      default() {
        return []
      },
    },
    buttonTexts: {
      type: Array,
      default() {
        return []
      },
    },
    filterPlaceholder: {
      type: String,
      default: '',
    },
    filterMethod: Function,
    leftDefaultChecked: {
      type: Array,
      default() {
        return []
      },
    },
    rightDefaultChecked: {
      type: Array,
      default() {
        return []
      },
    },
    renderContent: Function,
    value: {
      type: Array,
      default() {
        return []
      },
    },
    format: {
      type: Object,
      default() {
        return {}
      },
    },
    filterable: Boolean,
    props: {
      type: Object,
      default() {
        return {
          label: 'label',
          key: 'key',
          disabled: 'disabled',
        }
      },
    },
    targetOrder: {
      type: String,
      default: 'original',
    },
  },

  data() {
    return {
      query: '',

      leftChecked: [],
      rightChecked: [],
    }
  },
  computed: {
    transferStyle() {
      return {
        height: this.height,
      }
    },

    inputIcon() {
      return this.query.length > 0 && this.inputHover ? 'circle-close' : 'search'
    },

    dataObj() {
      const key = this.props.key
      return this.data.reduce((o, cur) => (o[cur[key]] = cur) && o, {})
    },

    sourceData() {
      return this.data.filter((item) => this.value.indexOf(item[this.props.key]) === -1)
    },

    targetData() {
      if (this.targetOrder === 'original') {
        return this.data.filter((item) => this.value.indexOf(item[this.props.key]) > -1)
      } else {
        return this.value.reduce((arr, cur) => {
          const val = this.dataObj[cur]
          if (val) {
            arr.push(val)
          }
          return arr
        }, [])
      }
    },

    hasButtonTexts() {
      return this.buttonTexts.length === 2
    },
  },

  watch: {
    query(val) {
      this.$refs.leftPanel.query = val
      this.$refs.rightPanel.query = val
    },
    value(val) {
      this.dispatch('ElFormItem', 'el.form.change', val)
    },
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'footer-format': 'footer-format is renamed to format.',
        },
      }
    },

    onSourceCheckedChange(val, movedKeys) {
      this.leftChecked = val
      if (movedKeys === undefined) return
      this.$emit('left-check-change', val, movedKeys)
    },

    onTargetCheckedChange(val, movedKeys) {
      this.rightChecked = val
      if (movedKeys === undefined) return
      this.$emit('right-check-change', val, movedKeys)
    },

    addToLeft() {
      let currentValue = this.value.slice()
      this.rightChecked.forEach((item) => {
        const index = currentValue.indexOf(item)
        if (index > -1) {
          currentValue.splice(index, 1)
        }
      })
      this.$emit('input', currentValue)
      this.$emit('change', currentValue, 'left', this.rightChecked)
    },

    addToRight() {
      let currentValue = this.value.slice()
      const itemsToBeMoved = []
      const key = this.props.key
      this.data.forEach((item) => {
        const itemKey = item[key]
        if (this.leftChecked.indexOf(itemKey) > -1 && this.value.indexOf(itemKey) === -1) {
          itemsToBeMoved.push(itemKey)
        }
      })
      currentValue =
        this.targetOrder === 'unshift' ? itemsToBeMoved.concat(currentValue) : currentValue.concat(itemsToBeMoved)
      this.$emit('input', currentValue)
      this.$emit('change', currentValue, 'right', this.leftChecked)
    },

    clearQuery() {
      this.$refs.leftPanel.query = ''
      this.$refs.rightPanel.query = ''
    },
  },
}
</script>

<style lang="scss">
.kem-transfer_body {
  position: relative;
  .filter_body {
    position: absolute;
    width: 100%;
    background-color: #ffffff;
    z-index: 1;
  }
  .conten_body {
    overflow: auto;
    position: absolute;
    width: 100%;
    height: 100%;
    padding-top: 40px;
  }
}
</style>
