<template>
  <div class="about">
    <KemButton type="none" style="color: red" tip="ssss" @click="clickDel">123</KemButton>
    <KemButton type="text.del" @click="clickDel"></KemButton>
    <KemButton type="text.add"></KemButton>
    <KemButton type="icon.del"></KemButton>
    <KemButton type="operate.del"></KemButton>
    <KemButton type="operate.add"> 自定义 </KemButton>
    <KemButton type="operate.add"></KemButton>
    <KemButton type="operate.edit"></KemButton>
    <KemButton type="custom.date" :custom-button-config="customButtonConfig"></KemButton>
    <KemButton>primary按钮</KemButton>
    <KemButton type="danger"> danger按钮 </KemButton>
    <KemButton type="default"> default按钮 </KemButton>
    <KemButton :select-button-group="selectButtonGroup" @clickButtonItem="clickButtonItem"> 下拉按钮 </KemButton>
  </div>
</template>
<script>
export default {
  name: 'Button',
  displayName: '按钮',

  data() {
    return {
      selectButtonGroup: [
        { value: '11', label: '11' },
        { value: '2', label: '2' },
        { value: '4', label: '3' },
      ],
      customButtonConfig: {
        date: {
          type: 'success',
          text: '日期',
          icon: 'el-icon-date',
        },
      },
    }
  },
  methods: {
    clickButtonItem({ value }) {
      this.$message.success(value)
    },
    clickDel() {
      this.$message.success('123')
    },
  },
}
</script>
