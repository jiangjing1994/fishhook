<template>
  <div>
     {{ computedValue }}
    <el-date-picker
      v-model="computedValue"
      value-format="yyyy-MM-dd hh:mm:ss"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    >
    </el-date-picker>
  </div>

</template>

<script>/**
 * @displayName RangePicker 范围选择器
 */
export default {
  name: "KemRangePicker",
  props: {
    uiType: {
      type: String,
      default: "normal"
    },
    value: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /**
     * 字段映射默认 start end
     */
    defaultProps: {
      type: Object,
      default: () => {
        return {
          start: "start",
          end: "end"
        };
      }
    }
  },
  data() {
    return {
      value1: []
    }
  },

  computed: {
    evet() {
      return this.$listeners;
    },
    label() {
      return this.$attrs.value;
    },
    computedValue:{
      get(){
        const { start, end } = this.defaultProps;
        let value = this.value;
        const startValue =  value[start]  || ''
        const endValue =  value[end] || ''

        if (startValue && endValue){
          return [startValue, endValue]
        }else {
          return []
        }

      },
      set(value){
        const { start, end } = this.defaultProps;
        let newValue  = this.value
        newValue[start] = value[0]
        newValue[end] = value[1]

        this.$emit('input',newValue)

      }

    }
  }
};
</script>
<style lang="scss"></style>
