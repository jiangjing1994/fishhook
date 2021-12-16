<template>
  <div class="kem-select_body">
    <KemLabelText v-if="uiType === 'text'" :value="label" />
    <el-select
      v-else
      v-bind="$attrs"
      :value="v"
      :multiple="multiple"
      :placeholder="placeholder"
      :filterable="filterable"
      :clearable="inputClearable"
      :style="`width:${width}`"
      :value-key="valueKey"
      v-on="evet"
    >
      <!-- @slot prefix	Select 组件头部内容 -->
      <slot slot="prefix" name="prefix" />

      <!-- @slot empty	Select empty -->
      <slot slot="empty" name="empty" />

      <el-option
        v-for="(item, index) in list"
        :key="index"
        :label="item.label"
        :disabled="item.disabled"
        :value="getoptionValue(item)"
      >
        <div v-if="uiType === 'checkbox'" class="el-select-dropdown__item" style="padding-left: 10px">
          <div class="kem-select-mask"></div>
          <div v-if="index === 0 && multiple" class="kem-select-mask-botton" @click.stop>
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"
              ><span class="kem-check-all">全选</span></el-checkbox
            >
          </div>
          <el-checkbox :value="isActive(item)" :label="item.label" @click="change"></el-checkbox>
        </div>
        <slot :scope="item"></slot>
      </el-option>
    </el-select>
    <!--    是否全选 {{ checkAll }} {{ isIndeterminate }}-->
    <!--    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>-->
  </div>
</template>
<script>
/**
 * @displayName Select下拉框
 */
import mixins from '../../mixins/async_form_element'
import { isExitsVariable, get } from '../../utils'
const isCheckAll = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  arr1.forEach((item) => {
    if (arr2.indexOf(item) === -1) {
      return false
    }
  })
  return true
}
const isIndeterminate = (arr1, arr2) => {
  return arr1.length !== arr2.length && arr1.length > 0
}

export default {
  name: 'KemSelect',
  mixins: [mixins],
  props: {
    placeholder: {
      type: String,
      default: '请选择',
    },

    filterable: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    valueIsObject: {
      type: Boolean,
      default: false,
    },
    valueKey: {
      type: String,
      default: '',
    },

    /**
     * label 数据类型
     *  @values array, string,
     */
    valueDataType: {
      type: String,
      default: 'array',
    },

    // 分隔符
    separator: {
      type: String,
      default: ',',
    },

    width: {
      type: String,
      default: '100%',
    },
  },
  data() {
    return {
      data: [],
      checkAll: false,
      isIndeterminate: true,
    }
  },
  computed: {
    v() {
      let value = ''
      if (!isExitsVariable(this.$attrs.value)) {
        return ''
      }

      if (this.multiple) {
        if (this.valueDataType === 'array') {
          value = this.$attrs.value
        } else if (this.valueDataType === 'string') {
          value = this.$attrs.value.split(this.separator)
        }

        return value || ''
      } else {
        return this.$attrs.value
      }
    },
  },
  watch: {
    v(newValue, oldValue) {
      if (this.multiple) {
        const arr = this.options.map((item) => get(item, this.defaultProps['value']))
        this.checkAll = isCheckAll(newValue, arr)
        this.isIndeterminate = isIndeterminate(newValue, arr)
      }
    },
  },
  methods: {
    change(v) {
      console.log(v)
    },
    isActive(item) {
      // multiple 是否多选逻辑不同
      if (this.multiple) {
        return this.v.includes(this.getoptionValue(item))
      } else {
        return this.getoptionValue(item) === this.v
      }
    },
    handleCheckAllChange(val) {
      console.log(val)
      const value = val ? this.options.map((item) => get(item, this.defaultProps['value'])) : []
      this.exportInputValue(value)
      this.isIndeterminate = false
    },
    getoptionValue(item) {
      if (this.valueIsObject) {
        return item
      } else {
        return item.value
      }
    },
  },
}
</script>

<style lang="scss">
.kem-select-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.kem-select-mask-botton {
  position: relative;
  z-index: 99;
  background-color: #efefef;
  left: -5px;
  padding-left: 5px;
  cursor: default;
  .kem-check-all {
    font-weight: bold;
    color: #333;
  }
}
</style>
