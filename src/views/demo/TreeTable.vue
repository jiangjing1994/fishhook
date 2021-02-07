<template>
    <div>
        <KemPageCard header="静态树~">
            <!--静态树-->
            <TreeTableLoopFalse></TreeTableLoopFalse>

        </KemPageCard>
        <KemPageCard header="静态自动递归树~">
            <!--递归树-->
            <TreeTableLoop></TreeTableLoop>

        </KemPageCard>
        <KemPageCard header="懒加载树~">
            <!--递归树-->
            <TreeTableLazy></TreeTableLazy>

        </KemPageCard>

    </div>

</template>

<script>
import TreeTableLoop from '../table/TreeTableLoop'
import TreeTableLazy from '../table/TreeTableLazy'
import TreeTableLoopFalse from '../table/TreeTableLoopFalse'

export default {
    name: "TreeTable",
    components:{
        TreeTableLoop,
        TreeTableLazy,
        TreeTableLoopFalse,

    },

};
</script>

<style scoped></style>
