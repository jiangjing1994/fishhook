<template>
  <div></div>
</template>

<script>
/**
 * @displayName Charts 图表模板
 */
export default {
  name: "KemCharts",
  props: {
    /** 图表库类型类型
     * @values echarts, g2,
     */
    libType: {
      type: String,
      default: "echarts",
    },
    data: {
      type: [Array, Number],
      required: true,
    },
    width: { type: String, default: "auto" },
    height: { type: String, default: "400px" },
    dataEmpty: Boolean,
    loading: Boolean,
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    name() {},
  },
};
</script>

<style lang="scss" scoped>
</style>
