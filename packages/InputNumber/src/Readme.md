- Example:

```vue
<template>
  <div>
    <pre>{{ value }}</pre>
    <KemInputNumber v-model="value"></KemInputNumber>
  </div>
</template>

<script>
export default {
  name: 'InputNumber',
  data() {
    return {
      value: 101,
    }
  },
}
</script>

<style scoped></style>
```
