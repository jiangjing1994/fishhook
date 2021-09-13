<template>
  <div>
    <KemD52tButton value="123" @focus="focus"
                   @click="click"
></KemD52tButton>
    <KemD52tButton value="123" @focus="focus"
                   @click="click"
>111</KemD52tButton>
  </div>

</template>

<script>
export default {
  name: "D52tButton",
  methods: {
    focus() {

      console.log(111111)
    },
    click() {
      console.log(22222222222)

    },
  },
}
</script>

<style scoped>

</style>
