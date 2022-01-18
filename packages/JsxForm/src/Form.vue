<template>
  <el-form
    ref="elForm"
    v-bind="computedConfig"
    :model="model"
    :class="['jsx-form', formClass]"
    :rules="computedFormRules"
    :disabled="disabled"
    v-on="$listeners"
  >
    <div v-if="readOnly" class="mask"></div>
    <el-row class="fomr_item_body" :gutter="computedRowGutter">
      <template v-for="(item, idx) in column">
        <jsx-form-item
          v-if="!item.show || item.show(model, model, -1)"
          :key="getItemKey(item, idx)"
          v-bind="$attrs"
          :column="item"
          :empty-words="emptyWords"
          :form="model"
          :root-form="model"
          :label-position="computedConfig.labelPosition"
          :label-width="computedConfig.labelWidth"
          :form-rules="rules"
          :disabled="disabled"
        />
        <template slot="labelSuffix"> 3333 </template>
      </template>
    </el-row>
  </el-form>
</template>

<script>
import JsxFormItem from './FormItem'

export default {
  name: 'KemJsxForm',
  components: { JsxFormItem },
  props: {
    /**
     * 是否只读
     */
    readOnly: {
      type: Boolean,
      default: false,
    },
    /**
     * 自定义表单配置 $MIMI
     */
    formConfig: Object,
    /**
     * 校验规则
     */
    formRules: Object,
    /**
     * 表单项
     */
    formItems: [Array, Function],

    /**
     * 表单行Gutter $MIMI
     */
    rowGutter: Number,

    model: {
      type: Object,
      default: () => ({}),
    },

    emptyText: {
      type: String,
      default: '',
    },

    labelPosition: {
      type: String,
      default: '',
    },
    labelWidth: {
      type: String,
      default: '',
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedConfig() {
      return {
        ...this.$MIMI.Form.formConfig,
        ...this.formConfig,
      }
    },
    computedRowGutter() {
      return this.rowGutter || this.$MIMI.Form.rowGutter
    },
    computedFormRules() {
      return this.formRules
    },
    column() {
      let formItems = this.formItems

      if (typeof formItems === 'function') {
        formItems = formItems(this.model)
      }

      return formItems
    },

    emptyWords() {
      return this.emptyText || (this.$jsxForm && this.$jsxForm.emptyText) || ''
    },
    formClass() {
      return this.$jsxForm ? this.$jsxForm.formClass : ''
    },
  },
  methods: {
    getItemKey(item, index) {
      return `${item.prop}-${index}`
    },
    validate(cb) {
      this.$refs.elForm.validate(cb)
    },
    validateField(props, cb) {
      this.$refs.elForm.validateField(props, cb)
    },
    resetFields() {
      this.$refs.elForm.resetFields()
    },
    clearValidate(props) {
      this.$refs.elForm.clearValidate(props)
    },
  },
}
</script>

<style lang="scss">
.jsx-form {
  .mask {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: not-allowed;
  }
  .el-form--inline {
    display: flex;

    ::v-deep .jsx-form-item__object {
      padding: 0;
      display: flex;
    }
  }
}
</style>
