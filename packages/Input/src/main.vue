
<template>
    <div>
      <KemLabelText v-if="uiType ==='text'" :value="label"></KemLabelText>
      <el-input v-else v-bind="$attrs" :placeholder="placeholder" :clearable="inputClearable" v-on="evet">
        <!-- @slot prefix	输入框头部内容，只对 type="text" 有效 -->
        <slot slot="prefix" name="prefix"/>

        <!-- @slot suffix	输入框头部内容，只对 type="text" 有效 -->
        <slot slot="suffix" name="suffix"/>

        <!-- @slot prepend	输入框头部内容，只对 type="text" 有效 -->
        <slot slot="prepend" name="prepend"/>

        <!-- @slot append	输入框头部内容，只对 type="text" 有效 -->
        <slot slot="append" name="append"/>
      </el-input>
    </div>




</template>
<script>
/**
 * @displayName Input 输入框
 */
export default {
  name: 'KemInput',
  props: {
    placeholder: {
      type: String,
      default: '请输入',
    },
    uiType: {
      // text normal
      type: String,
      default: 'normal',
    },
    /**
     * 清空 $MIMI.Input
     */
    clearable:Boolean,
  },
  computed: {
    inputClearable() {
      return this.clearable || this.$MIMI.Input.clearable
    },
    evet() {
      return this.$listeners
    },
    label() {
      return this.$attrs.value
    },
  },
}
</script>
