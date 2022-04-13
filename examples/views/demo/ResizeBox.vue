<template>
  <KemResizeBox @resize="resize">
    <pre style="height: 100%; width: 100%; background-color: royalblue; color: #ffffff; font-weight: bold">
一个丝滑的自适应框框</pre
    >
  </KemResizeBox>
</template>

<script>
export default {
  name: 'ResizeBox',
  props: {
    propName: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      value: '',
    }
  },
  methods: {
    resize(value) {
      console.log(value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
