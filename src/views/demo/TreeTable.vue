<template>
    <div>
        <KemPageCard header="递归树~">
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

export default {
    name: "TreeTable",
    components:{
        TreeTableLoop,
        TreeTableLazy,

    },

};
</script>

<style scoped></style>
