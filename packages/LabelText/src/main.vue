<template>
  <span class="kem-label-text">
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

<style>
.kem-label-text {
  padding: 0 8px;
  font-size: 0.95em;
}
</style>
