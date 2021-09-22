<template>
  <avue-input-tree
    v-bind="$attrs"
    default-expand-all
    type="tree"
    :dic="computedOption"
    :placeholder="placeholder"
    v-on="evet"
  ></avue-input-tree>
</template>

<script>
export default {
  name: 'KemInputTree',
  props: {
    defaultProps: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value',
        }
      },
    },
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
    option: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      disabled: false,
      loading: false,
      list: [],
      object: {},
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
      return this.option
    },
  },
  watch: {
    '$attrs.value': {
      handler: function (val) {},
      immediate: true,
    },
  },
  created() {
    //this.getList()
  },
  methods: {},
}
</script>

<style scoped></style>
