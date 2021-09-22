<template>
  <div>
    <pre>{{ value }}</pre>
    <KemRangePicker v-model="value" />
  </div>
</template>

<script>
export default {
  name: 'RangePicker',

  data() {
    return {
      value: {},
    }
  },
}
</script>

<style lang="scss" scoped></style>
