<template>
  <KemTable
    :column="column"
    :menu-button="menuButton"
    :request="request"
    :result="result"
    :default-params="defaultParams"
    :menu-width="250"
    :wait-refresh="waitRefresh"
    @clickMenuButton="clickMenuButton"
  >
    <template slot="menuTop">
      {{ defaultParams }}
      {{ appendcolumn }}
      <KemButton @click="toggle"> {{ waitRefresh }}切换定时</KemButton>
      <KemButton @click="aappendCol"> 增加一列{{ appendcolumnNumber }}</KemButton>
    </template>
    <template slot="menu" slot-scope="{ scope }">
      <KemButton
        v-if="'Mark' === scope.row.createUser"
        type="text"
        @click="sadasda(scope.row.createUser)"
        >{{ scope.row.createUser }}</KemButton
      >
    </template>
    <template v-for="i in appendcolumn" :slot="i.slot" slot-scope="{ scope }">
      {{ scope.row[i.prop] }}
    </template>
  </KemTable>
</template>

<script>
import { queryList2 } from '../../utils/index'
export default {
  name: 'AsyncColumnTable',
  data() {
    return {
      defaultParams: {
        appendcolumnNumber: 0,
      },
      request: queryList2,
      menuButton: ['delBtn', 'addBtn', 'editBtn'],
      waitRefresh: 2000,
      appendcolumnNumber: 0,
      appendcolumn: [],
    }
  },
  computed: {
    column() {
      return [
        { label: 'organize_id', prop: 'organize_id' },
        { label: 'sj', prop: 'sj' },
        { label: 'organize_name', prop: 'organize_name' },

        ...this.appendcolumn,
      ]
    },
  },
  methods: {
    aappendCol(res) {
      this.appendcolumnNumber += 1
      this.appendcolumn.push({
        label: 'prop' + this.appendcolumnNumber,
        prop: 'prop' + this.appendcolumnNumber,
        slot: 'prop' + this.appendcolumnNumber,
      })
      this.defaultParams['appendcolumnNumber'] = this.appendcolumnNumber
    },
    result(res) {
      return res.data
    },
    toggle(value) {
      if (this.waitRefresh) this.waitRefresh = 0
      else this.waitRefresh = 2000
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
