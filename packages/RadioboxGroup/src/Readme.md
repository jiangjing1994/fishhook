- Example:

```vue
<template>
  <div>
    <pre>{{ value }}</pre>
    <KemRadioboxGroup v-model="value" :options="options" />
  </div>
</template>

<script>
export default {
  name: 'RadioboxGroup',
  data() {
    return {
      value: [],

      options: [
        {
          value: 'Beijing',
          label: '北京',
        },
        {
          value: 'Shanghai',
          label: '上海',
        },
        {
          value: 'Nanjing',
          label: '南京',
        },
        {
          value: 'Chengdu',
          label: '成都',
        },
        {
          value: 'Shenzhen',
          label: '深圳',
        },
        {
          value: 'Guangzhou',
          label: '广州',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
```
