<template>
    <div>
        <KemPageCard header="简单的表格">
            <!--简单表格静态数据纯用于展示-->
            <SimpaleTable></SimpaleTable>
            <template slot="footer"></template>

        </KemPageCard>
        <KemPageCard header="稍微复杂一点的表格">
            <!--稍微复杂一点的表格 数据是异步的-->
             <BaseTable></BaseTable>

        </KemPageCard>
    </div>

</template>

<script>
import SimpaleTable from '../table/SimpaleTable'
import BaseTable from '../table/BaseTable'
export default {
    name: "Table",
    components:{
        SimpaleTable,
        BaseTable
    },

};
</script>

<style scoped></style>
