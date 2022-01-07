<template>
  <div>
    {{ page }}
    <grid :page.sync="page" :data="data" :option="option" @on-load="onLoad"> </grid>
    <grid :data="data1" :option="option" :page.sync="page1" @size-change="sizeChange" @current-change="currentChange">
      <template slot="nameHeader" slot-scope="{ column }">
        <el-tag>{{ (column || {}).label }}-{{ (column || {}).prop }}</el-tag>
      </template>
      <template slot="sexHeader" slot-scope="{ column }">
        <el-tag>{{ (column || {}).label }}-{{ (column || {}).prop }}</el-tag>
      </template>
    </grid>
    <KemTable
      ref="multipleTable"
      :column="column"
      :menu-button="menuButton"
      :request="request"
      :result="result"
      :default-params="defaultParams"
      :reserve-selection="true"
      :menu-width="250"
      :selection="true"
      row-key="organize_id"
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
import { queryList2 } from '../../utils/index'
export default {
  name: 'SelectionTable',
  data() {
    return {
      page: {
        pageSize: 2,
        pageSizes: [2, 3],
      },
      page1: {
        currentPage: 1,
        pageSize: 2,
        pageSizes: [2, 3],
      },
      data: [],
      data1: [],
      option: {
        selection: true,
        rowKey: 'organize_id',
        reserveSelection: true,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: '姓名',
            prop: 'name',
            headerslot: 'name',
          },
          {
            label: '性别',
            prop: 'sex',
            headerslot: true,
          },
        ],
      },
      defaultParams: {},
      request: queryList2,
      menuButton: ['allBtn', 'addBtn', 'delBtn'],
      tableData: [],
      column: [
        { label: 'organize_id', prop: 'organize_id' },
        { label: 'parent_organize_id', prop: 'parent_organize_id' },
        { label: 'organize_name', prop: 'organize_name' },
        { label: 'code', prop: 'code' },
        { label: 'org_type', prop: 'org_type' },
        { label: 'state', prop: 'state' },
        { label: 'create_date', prop: 'create_date' },
        { label: 'ext1', prop: 'ext1' },
        { label: 'ext2', prop: 'ext2' },
        { label: 'ext3', prop: 'ext3' },
      ],
    }
  },
  created() {
    this.getList()
  },

  methods: {
    sizeChange(val) {
      this.page1.currentPage = 1
      this.page1.pageSize = val
      this.getList()
      this.$message.success('行数' + val)
    },
    currentChange(val) {
      this.page1.currentPage = val
      this.getList()
      this.$message.success('页码' + val)
    },
    getList() {
      this.page1.total = 40
      if (this.page1.currentPage === 1) {
        this.data1 = [
          {
            id: 1,
            name: '张三',
            sex: '男',
          },
          {
            id: 2,
            name: '李四',
            sex: '女',
          },
        ]
      } else if (this.page1.currentPage == 2) {
        this.data1 = [
          {
            id: 3,
            name: '王五',
            sex: '女',
          },
          {
            id: 4,
            name: '赵六',
            sex: '女',
          },
        ]
      }
      if (this.page1.currentPage === 1) {
        this.data1 = [
          {
            id: 1,
            name: '张三',
            sex: '男',
          },
          {
            id: 2,
            name: '李四',
            sex: '女',
          },
        ]
      } else if (this.page1.currentPage == 2) {
        this.data1 = [
          {
            id: 3,
            name: '王五',
            sex: '女',
          },
          {
            id: 4,
            name: '赵六',
            sex: '女',
          },
        ]
      }
    },
    onLoad(page, a) {
      console.log(a)
      console.log(page)

      setTimeout(() => {
        this.page.total = 40

        if (this.page.currentPage === 1) {
          this.data = [
            {
              organize_id: 1,
              name: '张三',
              sex: '男',
            },
            {
              organize_id: 2,
              name: '李四',
              sex: '女',
            },
          ]
        } else if (this.page.currentPage == 2) {
          this.data = [
            {
              organize_id: 3,
              name: '王五',
              sex: '女',
            },
            {
              organize_id: 4,
              name: '赵六',
              sex: '女',
            },
          ]
        }
      }, 2000)
    },

    result(res) {
      this.tableData = res.data
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
          return row.organize_id
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
