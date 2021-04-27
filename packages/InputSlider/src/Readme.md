- Example:

```vue
<template>
  <div>
    <pre>{{ val }}</pre>
    <KemInputSlider v-model="val"></KemInputSlider>
  </div>
</template>

<script>
export default {
  name: 'InputSlider',
  data() {
    return {
      val: [12, 33],
    }
  },
}
</script>

<style scoped></style>
```
