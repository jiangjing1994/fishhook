<template>
  <KemTable
    :column="column"
    :menu-button="menuButton"
    :request="request"
    :default-params="defaultParams"
    :menu-width="250"
    @clickMenuButton="clickMenuButton"
  />
</template>

<script>
import { queryList } from '@/utils/index'
export default {
  name: 'TestTable',
  data() {
    return {
      defaultParams: {},
      request: queryList,
      menuButton: ['allBtn', 'addBtn', 'delBtn'],

      column: [
        { label: '业务需求编号', prop: 'code' ,sortable:true},
        { label: '需求主题', prop: 'title' },
        { label: '需求类型', prop: 'type' },
        { label: '需求提交人', prop: 'createUser' },
        { label: '需求提交时间', prop: 'createTime' },
        { label: '正式需求编号', prop: 'formalCode' },
      ],
    }
  },
  methods: {
    rowClick(value) {
      this.$message.success(JSON.stringify(value))
    },
    save(value) {
      this.$message.success(JSON.stringify(value))
    },
    clickMenuButton(value) {
      this.$message.success(JSON.stringify(value))
    },
  },
}
</script>

<style scoped></style>
