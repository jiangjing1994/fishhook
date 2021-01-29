<template>
    <div>
        <KemTable
                :table-data="treeData"
                :column="column"
                row-key="id"
                :tree-props="treeProps"
        >
            <template slot="icon" slot-scope="{scope}">
                <i :class="scope.row.icon" style="font-size:24px"></i>
            </template>
        </KemTable>
    </div>

</template>

<script>
export default {
    name: "TreeTable",
    data() {
        return {
            treeProps:{
                loop:true,
                id:'id',
                pid:'parentId'
            },
            treeData:[
                {"id":"inter","parentId":"product","spType":0,"layerId":0,"seqId":1,"name":"网络产品","deleted":"0"},
                {"id":"product","parentId":"","spType":0,"layerId":0,"seqId":50,"name":"产品中心","deleted":"0"},
                {"id":"online","parentId":"product","spType":0,"layerId":0,"seqId":2,"name":"线上产品","deleted":"0"},
                {"id":"unline","parentId":"product","spType":0,"layerId":0,"seqId":3,"name":"线下产品","deleted":"0"},
                {"id":"update","parentId":"dispatch","spType":0,"layerId":0,"seqId":1,"name":"关于产品更新","deleted":"0"},
                {"id":"dispatch","parentId":"","spType":0,"layerId":0,"seqId":2,"name":"通知公告","deleted":"0"},
                {"id":"diedai","parentId":"dispatch","spType":0,"layerId":0,"seqId":2,"name":"产品迭代","deleted":"0"},
                {"id":"address","parentId":"about","spType":0,"layerId":0,"seqId":1,"name":"公司地址","deleted":"0"},
                {"id":"about","parentId":"","spType":0,"layerId":0,"seqId":1,"name":"关于我们","deleted":"0"},
                {"id":"portals","parentId":"","spType":0,"layerId":0,"seqId":3,"name":"门户管理","deleted":"0"},
                {"id":"communication","parentId":"address","spType":0,"layerId":0,"seqId":1,"name":"联系我","deleted":"0"},
            ],
             column:[
                 {
                     label: 'name',
                     prop: 'name',
                 },
                {
                    label: 'layerId',
                    prop: 'layerId',
                },

            ]
        }
    },
}
</script>

<style scoped>

</style>
