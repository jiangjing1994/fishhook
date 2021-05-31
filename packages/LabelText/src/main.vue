<template>
  <span style="padding: 0 8px; font-size: 0.95em">
    {{ value }}
  </span>
</template>
<script>
/**
 * @displayName LabelText 文本文字
 */
export default {
  name: 'KemLabelText',
  props: {
    value: {
      default: '',
    },
  },
  watch: {
    value(newValue) {
      this.$emit('input', newValue)
    },
  },

  methods: {},
}
</script>

<style scoped></style>
