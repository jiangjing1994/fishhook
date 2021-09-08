<template>
  <div>
    <KemLabelText v-if="uiType ==='text'" :value="label"/>
    <el-select
      v-else
      v-bind="$attrs"
      :value="v" :multiple="multiple"
      :placeholder="placeholder"
      :filterable="filterable"
      :clearable="inputClearable"
      :style="`width:${width}`"
      :value-key="valueKey"
      v-on="evet"
    >
      <!-- @slot prefix	Select 组件头部内容 -->
      <slot slot="prefix" name="prefix"/>

      <!-- @slot empty	Select empty -->
      <slot slot="empty" name="empty"/>

      <el-option v-for="(item,index) in list " :key="index" :label="item.label" :disabled="item.disabled" :value="getoptionValue(item)">
        <slot :scope="item"></slot>
      </el-option>
    </el-select>
  </div>
</template>
<script>
/**
 * @displayName Select下拉框
 */
import mixins from '../../mixins/async_form_element'
import {isExitsVariable,isObject} from '../../utils'
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
    }
  },
  computed: {

    v() {
      let value = ''
      if (!isExitsVariable(this.$attrs.value)){
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
  methods: {
    getoptionValue(item) {
      if (this.valueKey) {
        return item.value
      }else {
        return item.value

      }
    }
  },
}
</script>

<style scoped></style>
