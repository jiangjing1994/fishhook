<template>
  <KemTable
    :column="column"
    :menu-button="menuButton"
    :request="request"
    :result="result"
    :default-params="defaultParams"
    :menu-width="250"
    :wait-refresh="2000"
    @clickMenuButton="clickMenuButton"
  >
    <template slot="menu" slot-scope="{ scope }">
      <KemButton v-if="'Mark' === scope.row.createUser" @click="sadasda(scope.row.createUser)" type="text">{{
        scope.row.createUser
      }}</KemButton>
    </template>
  </KemTable>
</template>

<script>
import { queryList } from '../../utils/index'
export default {
  name: 'WaitRefreshTable',
  data() {
    return {
      defaultParams: {},
      request: queryList,
      menuButton: ['delBtn','addBtn','editBtn'],

      column: [
        { label: '业务需求编号', prop: 'code', sortable: true },
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
      return res.data
    },
    sadasda(value) {
     console.log(value)
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
