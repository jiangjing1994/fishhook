- Vue component example:

```vue
<template>
  <div>
    <pre>{{ searchForm }}</pre>
    <KemSearch v-model="searchForm" :formItems="formItems" />
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchForm: {},
      formItems: [
        { label: '活动名称', prop: 'name', span: 8 },
        { label: '电子邮箱', prop: 'email', span: 8 },
        { label: '人员总数', prop: 'num', span: 8, component: 'KemInputNumber' },
      ],
    }
  },
}
</script>

<style scoped></style>
```
