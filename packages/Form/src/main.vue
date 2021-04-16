<template>
  <el-form
    v-if="reload"
    ref="form"
    class="form_body--card"
    style="position: relative"
    v-bind="computedConfig"
    :rules="formRules || rules"
    :model="data"
  >
    <div v-if="readOnly" class="mask"></div>

    <el-row class="fomr_item_body">
      <el-col
        v-for="(item, index) in computedItems"
        :key="getItemKey(item, index)"
        :md="item.md"
        :sm="item.sm"
        :span="getItemSpan(item)"
      >
        <template v-if="!item.isFormGroup">
          <div :class="isFormGroup ? 'isformgrouptitle' : ''">
            <div
              v-if="item.tip && item.tipType === 'alert'"
              style="padding: 0 0 0 10px; margin-bottom: 5px"
            >
              <el-alert
                :title="item.tip"
                style="padding: 5px 6px"
                type="info"
                show-icon
                :closable="false"
              >
              </el-alert>
            </div>
            <el-form-item v-if="labelType === 'default'" :prop="item.prop">
              <render-content
                v-if="item.labelRender"
                slot="label"
                :render="item.labelRender"
                :data="item"
              />
              <span v-else slot="label">
                {{ item.label }}
                <el-tooltip
                  v-if="item.tip && item.tipType !== 'alert'"
                  effect="dark"
                  placement="bottom"
                >
                  <template slot="content">
                    <pre>{{ item.tip }}</pre>
                  </template>
                  <i class="el-icon el-icon-info" style="cursor: pointer"></i> : </el-tooltip
                >：
              </span>
              <slot :name="item.slot" v-bind="{ item }">
                <component
                  :is="item.component"
                  v-if="item.component !== 'Text'"
                  :ref="item.ref || `cp-${item.prop}`"
                  v-model="data[item.prop]"
                  :data="data"
                  v-bind="item.props"
                  v-on="item.listeners"
                />
                <span v-else>{{ data[item.prop] }}</span>
              </slot>
            </el-form-item>
            <div v-else style="margin-bottom: 14px; padding-right: 20px">
              <slot :name="item.slot" v-bind="{ item }">
                <component
                  :is="item.component"
                  v-if="item.component !== 'Text'"
                  :ref="item.ref || `cp-${item.prop}`"
                  v-model="data[item.prop]"
                  :data="data"
                  :placeholder="item.label"
                  v-bind="item.props"
                  v-on="item.listeners"
                />
                <span v-else>{{ data[item.prop] }}</span>
              </slot>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="fib-title_body">
            <div class="fib-icon__body">
              <i :class="`${item.icon || 'el-icon-paperclip'}`"></i>
            </div>
            <div class="fib-label__body">{{ item.label }}</div>
          </div>

          <div class="fib-element_body">
            <component
              :is="item.element"
              ref="component"
              :computed-items="computedItems"
              :data="data"
              v-bind="$attrs"
              v-on="$listeners"
            />
          </div>
        </template>
      </el-col>
      <div v-if="isFormGroup" class="line-vertical"></div>
    </el-row>
    <!--        <FormItem-->
    <!--                ref="formItem"-->
    <!--                v-bind="$attrs"-->
    <!--                :computed-items="computedItems"-->
    <!--                :is-form-group="isFormGroup"-->
    <!--                :data="data"-->
    <!--                v-on="$listeners"-->
    <!--        ></FormItem>-->
  </el-form>
</template>

<script lang="jsx">
import { cloneDeep, debounce } from '../../utils'

// element UI 组件
let defaultaAlias = {
  datePicker: {
    component: 'el-date-picker',
    props: {
      style: {
        width: '100%',
      },
      'value-format': 'timestamp',
    },
  },
}

import FormItem from './FormItem'
/**
 * @displayName Form 配置化表单
 */
export default {
  name: 'KemForm',
  components: {
    FormItem,
    RenderContent: {
      props: {
        render: Function,
        formatter: Function, // 格式化数据
        data: Object,
        prop: String,
      },
      render(h) {
        if (this.render) {
          return this.render(h, this.data)
        }
        let value = this.data[this.prop]
        if (this.formatter) {
          value = this.formatter(value, this.data)
        }
        return <span>{value}</span>
      },
    },
  },

  props: {
    /**
     * 自定义表单配置
     */
    formConfig: Object,

    /**
     * 表单项
     */
    formItems: [Array, Function],

    /**
     * 表单值
     */
    data: Object,

    /**
     * 校验规则
     */
    formRules: Object,

    /**
     * 是否只读
     */
    readOnly: {
      type: Boolean,
      default: false,
    },

    /**
     * 扩展属性
     */
    alias: {
      type: Object,
      default: () => {
        return {}
      },
    },
    /**
     * 表单组
     */
    isFormGroup: {
      type: Boolean,
      default: false,
    },

    /**
     * label 类型
     *  @values default, none,
     */
    labelType: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      computedItems: [],
      reload: false,
    }
  },
  computed: {
    computedConfig() {
      return {
        ...this.$MIMI.Form.defaultConfig,
        ...this.formConfig,
      }
    },
    rules() {
      let rules = this.computedItems.reduce((total, item) => {
        if (item.rules) {
          let rules = item.rules
          if (typeof rules === 'function') {
            rules = rules(this.data)
          }
          total[item.prop] = rules
        }
        return total
      }, {})
      return rules
    },
    computedFormData() {
      const data = cloneDeep(this.data)
      return JSON.stringify(data)
    },

    initialFormItems() {
      const isFormGroup = this.isFormGroup

      let formItems = this.formItems

      if (typeof formItems === 'function') {
        formItems = formItems(this.data)
      }

      if (!isFormGroup) {
        return formItems
      } else {
        let newFormItems = []
        for (let item of formItems) {
          newFormItems.push({
            ...item,
            isFormGroup: true,
          })
          newFormItems = [...newFormItems, ...item.formItems]
        }
        return newFormItems
      }
    },

    computedFormItems() {
      const initialFormItems = cloneDeep(this.initialFormItems)
      return JSON.stringify(initialFormItems)
    },
  },

  watch: {
    data: {
      handler() {
        this.getComputedItems()
      },
      deep: true,
      immediate: false,
    },

    computedFormData: {
      handler(newValue, oldValue) {
        this.updataFormDataDebounce({ vm: this, newValue, oldValue })
      },
      deep: false,
    },

    formItems: {
      handler() {
        this.getComputedItems()
      },
      deep: true,
    },
  },
  created() {
    this.getComputedItems()
  },
  methods: {
    getComputedItems() {
      this.reload = false
      const getci = () => {
        let alias = { ...defaultaAlias, ...this.alias }

        const initialFormItems = this.initialFormItems

        const createitemFun = (initialFormItems) => {
          const itemResult = []

          for (const item of initialFormItems) {
            // 剩余参数语法允许我们将一个不定数量的参数表示为一个数组。theArgs
            let { component = 'KemInput', showIf, prop, props, ...theArgs } = item

            let isShow = true
            if (typeof showIf === 'function' && !showIf(this.data)) {
              isShow = false
              continue
            }
            if (typeof props === 'function') {
              props = props(this.data)
            }
            if (component === 'label') {
              props = {
                ...props,
                data: this.data,
                prop,
              }
            }
            if (alias[component]) {
              props = {
                ...alias[component].props,
                ...props,
              }
              component = alias[component].component
            }
            itemResult.push({
              component,
              prop,
              isShow,
              showIf,
              props,
              ...theArgs,
            })
          }

          return itemResult
        }

        return createitemFun(initialFormItems)
        // eslint-disable-next-line no-unreachable
      }

      this.computedItems = getci()

      this.reload = true
    },
    updataFormDataDebounce: debounce(({ vm, newValue, oldValue }) => {
      vm.$emit('updataFormData', JSON.parse(newValue), JSON.parse(oldValue))
    }, 500),
    validate() {
      return new Promise((resolve) => {
        this.$refs.form.validate(resolve)
      })
    },
    clearValidate(props) {
      // 清空校验
      this.$refs.form.clearValidate(props)
    },
    formItemElement() {
      return this.$refs.formItem.$refs['component'][0]
    },
    getItemKey(item, index) {
      return `${item.prop}-${index}`
    },
    getItemSpan(item) {
      return item.span || (item.isFormGroup ? 24 : 12)
    },
    start(params) {
      this.$nextTick(() => {
        if (this.$refs['component'].start) {
          this.$refs['component'].start(params)
        }
      })
    },
    end() {
      this.$emit('end')
    },
  },
}
</script>
<style lang="scss">
.form_body--card {
  .mask {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: not-allowed;
  }
  .form-group__header {
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }

  .el-form-item__label {
    font-weight: bold;
    font-size: 12px;
    padding: 0 2px 0 0;
  }
}
</style>
