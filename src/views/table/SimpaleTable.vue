<template>
    <KemTable
            :table-data="data"
            :column="column"
            @rowClick="rowClick"
            @clickMenuButton="clickMenuButton"
    >

        <template slot="sex" slot-scope="{scope}">
            <KemButton type="text">{{ scope.row.sex }}</KemButton>
        </template>

    </KemTable>

</template>

<script>
import { queryList } from '@/utils/index'

export default {
    name: "SimpaleTable",
    data() {
        return {
            menuButton: ["allBtn", "addBtn", "delBtn"],

            expand: true,
            data:[],
            column: [
                {label: "业务需求编号", prop: "code",},
                {label: "需求主题", prop: "title"},
                {label: "需求类型", prop: "type"},
                {label: "需求提交人", prop: "createUser"},
                {label: "需求提交时间", prop: "createTime",},
                {label: "正式需求编号", prop: "formalCode"}
            ]
        };
    },
    created(){
        queryList().then(res=>{
            this.data = res.data
        })
    },
    methods: {
        rowClick(value) {

            this.$message.success(JSON.stringify(value))
        },
        save(value) {

            this.$message.success(JSON.stringify(value))
        },
        clickMenuButton(value) {
            console.log(value);
        }
    }
};
</script>

<style scoped></style>
