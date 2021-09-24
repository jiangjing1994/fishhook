<template>
  <div>
    <KemInputNumber v-model="v"></KemInputNumber>
    <KemInputNumber v-model="v" ui-type="text"></KemInputNumber>
  </div>
</template>

<script>
export default {
  name: 'Number',
  data() {
    return {
      v: 123,
    }
  },
}
</script>

<style scoped></style>
