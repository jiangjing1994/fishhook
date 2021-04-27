- Example:

```vue
<template>
  <div>
    <pre>{{ value }}</pre>
    <KemInputPassWord v-model="value"></KemInputPassWord>
  </div>
</template>

<script>
export default {
  name: 'InputPassWord',
  data() {
    return {
      value: '123456',
    }
  },
}
</script>

<style scoped></style>
```
