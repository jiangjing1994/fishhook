<template>
  <div>
    <pre>{{ value }}</pre>
    <pre>{{ value2 }}</pre>
    <pre>{{ value3 }}</pre>
    <KemDatePicker v-model="value"></KemDatePicker>
    <KemDatePicker v-model="value2" value-format="yyyy"></KemDatePicker>
    <KemDatePicker v-model="value3" value-format="hh:mm:ss" type="datetime"></KemDatePicker>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  data() {
    return {
      value: '',
      value2: '',
      value3: '',
    }
  },
}
</script>

<style scoped></style>
