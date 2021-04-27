- Example:

```vue
<template>
  <div>
    <pre>{{ value }}</pre>

    <KemSwitch v-model="value"></KemSwitch>
  </div>
</template>

<script>
export default {
  name: 'Switch',
  data() {
    return {
      value: true,
    }
  },
}
</script>

<style scoped></style>
```
