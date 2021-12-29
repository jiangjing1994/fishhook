- Example:

```vue
<template>
  <div style="text-align: left">
    <KemSteps :options="options" :active-index="activeIndex"></KemSteps>
  </div>
</template>

<script>
export default {
  name: 'Steps',
  data() {
    return {
      // 当前步骤条
      activeIndex: 1,
      options: [{ label: 'step1' }, { label: 'step2' }, { label: 'step3' }, { label: 'step4' }],
    }
  },
  computed: {
    titleList() {
      return [
        { title: '步骤 1' },
        { title: '步骤 2' },
        { title: '步骤 3' },
        { title: '步骤 4' },
        { title: '步骤 5' },
        { title: '步骤 6' },
        { title: '步骤 7' },
      ]
    },
  },
  methods: {
    next() {
      this.activeIndex++
    },
  },
}
</script>

<style scoped></style>
```
