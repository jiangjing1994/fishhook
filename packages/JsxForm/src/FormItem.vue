<template>
  <el-col :span="column.span || 12">
    <el-form-item
      v-bind="$attrs"
      :prop="propPath"
      :label="column.label"
      :required="column.required"
      :rules="column.rules"
      :error="column.error"
      :show-message="column.showMessage"
      :inline-message="column.inlineMessage"
      :size="column.size"
      :class="[
        'jsx-form-item',
        formClass && formClass + '-item',
        calcLabelPosition && `is-label-${calcLabelPosition}`,
        column.class,
      ]"
      v-on="$listeners"
    >
      <template v-if="column.renderLabel" slot="label">
        <span
          :class="['jsx-form-item__label-wrap', (column.required || isRequired) && 'is-required']"
          :style="labelStyle"
        >
          <render :form="form" :root-form="rootForm" :render="column.renderLabel" :scope="{ itemIndex }" />
        </span>
      </template>

      <template v-if="!column.renderLabel && calcLabelWidth && {}.hasOwnProperty.call(column, 'label')" slot="label">
        <span
          :class="['jsx-form-item__label-wrap', (column.required || isRequired) && 'is-required']"
          :style="labelStyle"
          >{{ column.label }}:
        </span>
      </template>

      <section
        v-if="column.children"
        :class="[
          'jsx-form-item__object',
          formClass && formClass + '-item__object',
          column.children && !column.children.length && 'is-empty',
        ]"
      >
        <template v-if="column.layout">
          <el-row v-bind="column.layout">
            <template v-for="(col, index) in column.children">
              <el-col :key="index" :span="getColSpan(col)" v-bind="col.layout">
                <jsx-form-item
                  v-if="!col.show || col.show(form[column.prop], rootForm, itemIndex)"
                  :column="col"
                  :form="form[column.prop]"
                  :root-form="rootForm"
                  :empty-words="emptyWords"
                  :parent-full-prop="propPath"
                  v-bind="column.layout"
                  :label-position="labelPosition"
                  :label-width="labelWidth"
                  :item-index="itemIndex"
                  :form-rules="formRules"
                  :disabled="disabled"
                />
              </el-col>
            </template>
          </el-row>
        </template>
        <template v-else>
          <template v-for="(col, index) in column.children">
            <jsx-form-item
              v-if="!col.show || col.show(form[column.prop], rootForm, itemIndex)"
              :key="index"
              :column="col"
              :form="form[column.prop]"
              :root-form="rootForm"
              :empty-words="emptyWords"
              :parent-full-prop="propPath"
              :label-position="labelPosition"
              :label-width="labelWidth"
              :item-index="itemIndex"
              :form-rules="formRules"
              :disabled="disabled"
            />
          </template>
        </template>
      </section>

      <section v-else-if="column.item" :class="['jsx-form-item__array', formClass && formClass + '-item__array']">
        <div v-for="(value, index) in form[column.prop]" :key="index" class="array-item">
          <div class="array-item__content">
            <template v-for="(col, idx) in column.item(value, rootForm)">
              <jsx-form-item
                v-if="!col.show || col.show(form[column.prop], rootForm, index)"
                :key="index + '-' + idx"
                :column="col"
                :form="value"
                :root-form="rootForm"
                :empty-words="emptyWords"
                :parent-full-prop="getParentPropForArray(index)"
                :label-position="labelPosition"
                :label-width="labelWidth"
                :item-index="index"
                :form-rules="formRules"
                :disabled="disabled"
              />
            </template>
            <i class="array-item__index">{{ index + 1 }}</i>
          </div>
          <el-tooltip content="删除" :open-delay="1000">
            <i
              class="array-item__delete el-icon-close"
              :class="[disabled && 'is-disabled']"
              @click="handleDeleteItem(index)"
            />
          </el-tooltip>
        </div>
        <div class="array-add" :class="[disabled && 'is-disabled']">
          <el-button
            :icon="{}.hasOwnProperty.call(column, 'itemButtonIcon') ? column.itemButtonIcon : 'el-icon-plus'"
            :disabled="disabled"
            size="mini"
            type="primary"
            plain
            @click="handleAddItem"
            >{{ column.itemButtonText }}
          </el-button>
        </div>
      </section>

      <template v-if="column.render">
        <render :form="form" :root-form="rootForm" :render="column.render" :scope="{ itemIndex }" />
      </template>

      <template v-if="column.component">
        <component
          :is="column.component"
          :ref="column.ref || `cp-${column.prop}`"
          v-model="form[column.prop]"
          :data="form"
          v-bind="componentProps(column.props)"
          v-on="column.listeners"
        />
      </template>

      <template v-if="column.renderError" slot="error" slot-scope="scope">
        <div class="el-form-item__error">
          <render :form="form" :root-form="rootForm" :render="column.renderError" :scope="{ ...scope, itemIndex }" />
        </div>
      </template>
    </el-form-item>
  </el-col>
</template>

<script>
import Render from './Render'
import { getPropByPath } from './utils'

export default {
  name: 'JsxFormItem',

  components: { Render },
  props: {
    column: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Object,
      default: () => ({}),
    },
    rootForm: {
      type: Object,
      default: () => ({}),
    },
    emptyWords: {
      type: String,
      default: '',
    },
    arrayIndex: {
      type: Number,
      default: null,
    },
    parentFullProp: {
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
    itemIndex: {
      type: Number,
      default: -1,
    },
    formRules: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    propPath() {
      if (!this.parentFullProp) {
        return this.column.prop
      }
      return this.parentFullProp + '.' + this.column.prop
    },
    formClass() {
      return this.$jsxForm ? this.$jsxForm.formClass : ''
    },
    calcLabelWidth() {
      // if (this.calcLabelPosition === 'top') {
      //   return 'auto';
      // }
      return this.column.labelWidth || this.labelWidth
    },
    calcLabelPosition() {
      return this.column.labelPosition || this.labelPosition || 'top'
    },
    labelStyle() {
      return {
        width: this.calcLabelWidth || 'auto',
        display: 'inline-block',
        textAlign: (['left', 'right'].includes(this.calcLabelPosition) && this.calcLabelPosition) || 'left',
      }
    },
    isRequired() {
      const rules = this.getRules()
      let isRequired = false

      if (rules && rules.length) {
        rules.every((rule) => {
          if (rule.required) {
            isRequired = true
            return false
          }
          return true
        })
      }
      return isRequired
    },
  },
  watch: {
    column: {
      handler() {
        this.setColumn()
      },
      immediate: true,
    },
  },
  methods: {
    getRules() {
      let formRules = this.formRules
      const selfRules = this.column.rules
      const requiredRule = this.column.required !== undefined ? { required: !!this.required } : []

      const prop = getPropByPath(formRules, this.column.prop || '')
      formRules = formRules ? prop.o[this.column.prop || ''] || prop.v : []

      return [].concat(selfRules || formRules || []).concat(requiredRule)
    },
    /**
     * 组件方式获取props
     */
    componentProps(props) {
      if (typeof props === 'function') {
        props = props(this.form)
      }
      return props
    },
    /**
     * 设置fomatter和默认渲染样式
     */
    setColumn() {
      if (this.column.formatter) {
        this.column.render = (h, form, rootForm) => {
          let value = this.column.formatter(form, rootForm)
          if (!value && value !== 0) {
            value = this.emptyWords
          }
          return <span class={[this.column.class]}>{value}</span>
        }
      }
      // if (this.column.component) {
      //   let { component, prop, props, ...theArgs } = this.column
      //   if (typeof props === 'function') {
      //     props = props(this.form)
      //   }
      //   return {
      //     component,
      //     prop,
      //     props,
      //     ...theArgs,
      //   }
      // }
      if (!this.column.render && !this.column.component) {
        this.column.render = (h, form) => {
          if (this.column.prop) {
            let value = (this.$attrs.value && this.$attrs.value[this.column.prop]) || (form && form[this.column.prop])
            if (!value && value !== 0) {
              value = this.emptyWords
            }
            return <span class={[this.column.class]}>{value}</span>
          }
          return <span>{this.emptyWords}</span>
        }
      }
    },

    /**
     * 获取上一级的完整prop路径
     */
    getParentPropForArray(idx) {
      return `${this.propPath}.${idx}`
    },

    /**
     * 生成新的数组项
     */
    _getNewArrayItem(obj, column) {
      column.forEach((it) => {
        if (Object.prototype.hasOwnProperty.call(it, 'children')) {
          obj[it.prop] = {}
          this._getNewArrayItem(obj[it.prop], it.children)
        } else if (Object.prototype.hasOwnProperty.call(it, 'item')) {
          obj[it.prop] = []
        } else {
          obj[it.prop] = {}.hasOwnProperty.call(it, 'value') ? it.value : undefined
        }
      })
      return obj
    },

    /**
     * 数组新增元素
     */
    handleAddItem() {
      let item = {}
      const column = this.column.item(this.form, this.rootForm)
      item = this._getNewArrayItem(item, column)
      this.form[this.column.prop].push(item)
    },

    /**
     * 数组删除元素
     */
    handleDeleteItem(idx) {
      this.form[this.column.prop].splice(idx, 1)
    },

    getColSpan(col) {
      const defaultSpan = Math.floor(24 / this.column.children.length)
      if (col.layout && col.layout.span) {
        return col.layout.span
      }
      return defaultSpan
    },
  },
}
</script>

<style lang="scss" scoped>
@mixin tip-square {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.jsx-form-item {
  &__object {
    border: 1px solid #eee;
    background-color: rgb(244, 244, 245);
    border-radius: 4px;
    padding: 24px 20px;
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    height: 100%;

    > .el-form-item:not(:last-of-type) {
      margin-bottom: 22px;
    }

    &.is-empty {
      padding: 0;
    }
  }
  &__array {
    .array-item {
      display: flex;
      border: 1px solid #efefef;
      background-color: #fff;
      margin-bottom: 10px;
      padding: 24px 20px;
      box-sizing: border-box;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      &__content {
        flex: 1;
        > .el-form-item:last-of-type {
          margin-bottom: 0;
        }
      }
      &__index {
        @include tip-square();
        color: gray;
        background: #eee;
        font-size: 12px;
        font-style: normal;
        font-weight: bold;
      }
      &__delete {
        @include tip-square();
        color: #fff;
        background: #f0595a;
        right: 20px;
        cursor: pointer;
        &.is-disabled {
          display: none;
          pointer-events: none;
        }
      }
    }
    .array-add {
      width: 100%;
      display: flex;
      &.is-disabled {
        display: none;
      }
      .el-button {
        width: 100%;
      }
    }
  }

  &.is-label {
    &-right,
    &-left {
      display: flex;
      flex-direction: row;
      ::v-deep .el-form-item__label {
        .jsx-form-item__label-wrap {
          font-weight: bold;
          font-size: 12px;
          padding: 0 10px 0 0;
        }
        .jsx-form-item__label-wrap.is-required::before {
          content: '*';
          color: #f56c6c;
          margin-right: 4px;
        }
        &::before {
          display: none;
        }
      }
      ::v-deep .el-form-item__content {
        margin-left: 0 !important;
        flex: 1;
      }
    }

    &-top {
      display: flex;
      flex-direction: column;
      ::v-deep .el-form-item__content {
        margin-left: 0 !important;
      }
      ::v-deep > .el-form-item__label {
        width: auto;
        align-self: baseline;
      }
    }

    &-right ::v-deep > .el-form-item__label {
      text-align: right !important;
    }
    &-left ::v-deep > .el-form-item__label {
      text-align: left !important;
    }
  }
}
</style>
