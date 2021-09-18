<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="code" label="业务需求编号" width="180"> </el-table-column>
      <el-table-column prop="title" label="需求主题" width="180"> </el-table-column>
      <el-table-column prop="type" label="需求类型"> </el-table-column>
    </el-table>
    <!--    <KemTable-->
    <!--            :column="column"-->
    <!--            :menu-button="menuButton"-->
    <!--            :request="request"-->
    <!--            :result="result"-->
    <!--            :default-params="defaultParams"-->
    <!--            :menu-width="250"-->
    <!--            @clickMenuButton="clickMenuButton"-->
    <!--    />-->
  </div>
</template>

<script>
import { queryList } from '../../utils/index'
export default {
  name: 'SuperTable',
  data() {
    return {
      defaultParams: {
        count: 20000,
      },
      request: queryList,
      menuButton: ['allBtn', 'addBtn', 'delBtn'],

      column: [
        { label: '业务需求编号', prop: 'code' },
        { label: '需求主题', prop: 'title' },
        { label: '需求类型', prop: 'type' },
        { label: '需求提交人', prop: 'createUser' },
        { label: '需求提交时间', prop: 'createTime' },
        { label: '正式需求编号', prop: 'formalCode' },
      ],
      tableData: [],
    }
  },
  created() {
    queryList(this.defaultParams).then((res) => {
      this.tableData = res.data
    })
  },
  methods: {
    result(res) {
      return res.data
    },
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
