<template>
  <div class="about">
    <KemButton :select-button-group="selectButtonGroup" @clickButtonItem='clickButtonItem' type="operate.del" />
    <KemButton type="operate.del" />
    <KemButton type="operate.del">
      删除你个鬼东西
    </KemButton>
    <KemButton type="operate.add" />
    <KemButton type="operate.edit" />
    <KemButton>默认按钮</KemButton>
    <KemButton type="danger">
      危险按钮
    </KemButton>
  </div>
</template>
<script >
export default {
  data() {
    return {
      selectButtonGroup: [
        { value:'11', label:'11'},
        { value:'2', label:'2'},
        { value:'4', label:'3'},
      ]
    }
  },
  methods: {
    clickButtonItem({value}) {
      console.log(value)

    }
  },
}
</script>


