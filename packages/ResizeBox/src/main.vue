<template>
  <div v-resize="{ resize, wait }" style="width: 100%; height: 100%">
    <slot></slot>
  </div>
</template>

<script>
/**
 * @displayName KemResizeBox
 */
import resize from '../../directives/resize'
export default {
  name: 'KemResizeBox',
  directives: {
    resize,
  },
  props: {
    wait: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {}
  },
  methods: {
    resize(value) {
      this.$emit('resize', value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
