<template>
  <div>
    <KemButton @click="dw"> 点我 </KemButton>
  </div>
</template>

<script>
export default {
  name: 'CrudDialog',
  data() {
    return {
      visible: false,
      visible2: false,
      visible3: false,
      visible4: false,
    }
  },
  methods: {
    dw() {
      this.$$showDialog({
        data: {},
        formItems: [
          { label: '活动名称', prop: 'name', span: 24 },
          { label: '电子邮箱', prop: 'email', span: 24 },
          { label: '人员总数', prop: 'num', span: 24, component: 'KemInputNumber' },
        ],
      })
    },
    dw2() {
      this.visible2 = !this.visible2
    },
    dw3() {
      this.visible3 = !this.visible3
    },
    dw4() {
      this.visible4 = !this.visible4
    },
    save() {
      this.$message('保存')
    },
  },
}
</script>

<style scoped></style>
