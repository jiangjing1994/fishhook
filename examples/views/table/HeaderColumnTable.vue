<template>
  <div>
    <avue-crud ref="crud" :option="option" :data="data">
      <template slot="nameHeader" slot-scope="{ column }">
        <el-tag>{{ (column || {}).label }}-{{ (column || {}).prop }}</el-tag>
      </template>
    </avue-crud>
    <KemTable
      :request="request"
      :column="column"
      @rowClick="rowClick"
      @clickMenuButton="clickMenuButton"
    >
      <template slot="typeHeader" slot-scope="{ column }">
        <el-tag>{{ (column || {}).label }}-{{ (column || {}).prop }}</el-tag>
      </template>
      <template slot="type" slot-scope="{ scope }">
        <KemButton type="text">{{ scope.row.type }}</KemButton>
      </template>
    </KemTable>
  </div>
</template>

<script>
import { queryList } from '../../utils/index'

export default {
  data() {
    return {
      request: queryList,

      expand: true,
      column: [
        { label: '业务需求编号', prop: 'code', component: 'KemInput' },
        { label: '需求主题', prop: 'title' },
        { label: '需求类型', prop: 'type', slot: true, headerslot: true },
        { label: '需求提交人', prop: 'createUser' },
        { label: '需求提交时间', prop: 'createTime' },
        { label: '正式需求编号', prop: 'formalCode' },
      ],
      option: {
        column: [
          {
            label: '姓名',
            prop: 'name',
            headerslot: 'sdfsdfsdf',
          },
          {
            label: '年龄',
            prop: 'sex',
          },
        ],
      },
      data: [
        {
          name: '张三',
          sex: '男',
        },
        {
          name: '李四',
          sex: '女',
        },
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
      console.log(value)
    },
  },
}
</script>

<style scoped></style>
