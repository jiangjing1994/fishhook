<template>
  <div>
    <KemPageCard header="简单表格静态数据纯用于展示~">
      <!--简单表格静态数据纯用于展示-->
      <SimpaleTable></SimpaleTable>
      <template slot="footer"></template>
    </KemPageCard>
    <KemPageCard header="稍微复杂一丢丢的表格">
      <!--稍微复杂一点的表格 数据是异步的-->
      <BaseTable></BaseTable>
    </KemPageCard>
    <KemPageCard header="各种menu~~expand~~花里胡哨版">
      <!--各种menu~~expand~~花里胡哨版-->
      <MenuTable></MenuTable>
    </KemPageCard>
    <KemPageCard header="我有一个带搜索框的大表哥">
      <!-- 我有一个带搜索框的大表哥-->
      <SerachTable></SerachTable>
    </KemPageCard>
  </div>
</template>

<script>
import SimpaleTable from '../table/SimpaleTable'
import BaseTable from '../table/BaseTable'
import MenuTable from '../table/MenuTable'
import SerachTable from '../table/SerachTable'
export default {
  name: 'Table',
  components: {
    SimpaleTable,
    BaseTable,
    MenuTable,
    SerachTable,
  },
}
</script>

<style scoped></style>
