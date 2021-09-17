<template>
  <div>
    <KemTable
      ref="multipleTable"
      :column="column"
      :menu-button="menuButton"
      :request="request"
      :result="result"
      :default-params="defaultParams"
      :menu-width="250"
      :selection="true"
      row-key="timestamp"
      @selectionChange="selectionChange"
      @clickMenuButton="clickMenuButton"
    />
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelectionIds([tableData[1], tableData[2]])">根据id切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleAllSelection()">选择all</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
import { queryList } from '../../utils/index'
export default {
  name: 'SelectionTable',
  data() {
    return {
      defaultParams: {},
      request: queryList,
      menuButton: ['allBtn', 'addBtn', 'delBtn'],
      tableData:[],
      column: [
        { label: '业务需求编号', prop: 'code' },
        { label: '需求主题', prop: 'title' },
        { label: '需求类型', prop: 'type' },
        { label: '需求提交人', prop: 'createUser' },
        { label: '需求提交时间', prop: 'createTime' },
        { label: '正式需求编号', prop: 'formalCode' },
      ],
    }
  },
  methods: {
    result(res) {
       this.tableData =  res.data
      return res.data
    },
    selectionChange(value) {
      this.$message.success(JSON.stringify(value.ids))
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.$refs.crud.clearSelection()
      }
    },
    toggleSelectionIds(rows) {
      if (rows) {


        let ids = rows.map((row) => {

          return row.timestamp
        })
        this.$refs.multipleTable.toggleIdSelection(ids)

      } else {
        this.$refs.multipleTable.$refs.crud.clearSelection()
      }
    },
    toggleAllSelection(rows) {
      this.$refs.multipleTable.$refs.crud.toggleAllSelection()

    },
    clearSelection() {
      this.$refs.multipleTable.$refs.crud.clearSelection()

    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
  },
}
</script>

<style scoped></style>
