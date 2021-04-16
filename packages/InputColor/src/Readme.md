- Vue component example:

```vue
<template>
  <div>
    <pre>{{ value }}</pre>
    <KemInputColor v-model="value"></KemInputColor>
  </div>
</template>

<script>
export default {
  name: 'InputColor',
  data() {
    return {
      value: '',
    }
  },
}
</script>

<style scoped></style>
```
