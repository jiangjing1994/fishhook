<template>
    <div>
        <KemTable
                :column="column"
                :request="request"
                :result="result"
                :menu-width="250"
                row-key="organize_id"
                :tree-props="treeProps"
                :treeLoad="treeLoad"
         >

        </KemTable>
    </div>

</template>

<script>
import {queryTreeElement, queryTreeRoot} from '@/utils/index'

export default {
    name: "TreeTableLazy",
    data() {
        return {
            request:queryTreeRoot,

            treeProps:{
                lazy:true,
            },

            column:[
                {label: "组织名称", prop: "organize_name"},
                {label: "父节点ID", prop: "parent_organize_id",},
                {label: "组织编码", prop: "code"},
                {label: "组织类型", prop: "org_type"},
                {label: "备注", prop: "notes",},
                {label: "状态", prop: "state"}

            ]
        }
    },
    methods: {
        result(res){
            return res.obj.map(item => {
                if (item.children_count > 0) {
                    return {
                        ...item,
                        hasChildren: true
                    }
                } else {
                    return item
                }
            })
        },
        treeLoad(tree, treeNode, resolve){
            queryTreeElement().then(res=>{
                 resolve( this.result(res))
            })

        },
    },
}
</script>

<style scoped>

</style>
