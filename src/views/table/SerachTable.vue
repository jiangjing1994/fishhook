<template>
    <KemTable
            :column="column"
            :menu-button="menuButton"
            :request="request"
            :result="result"
            :default-params="defaultParams"
            :menu-width="250"
            :search-props="searchProps"
            @searchFormUpdata="searchFormUpdata"
            @clickMenuButton="clickMenuButton"
    />
</template>

<script>
import { queryList } from '@/utils/index'
export default {
    name: "SimpaleTable",
    data() {
        return {
            defaultParams:{},
            request:queryList,
            menuButton: ["allBtn", "addBtn", "delBtn"],
            searchProps:{
                formItems:  [
                    {label: "业务需求编号", prop: "code",span:8},
                    {label: "需求主题", prop: "title",span:8},
                    {label: "选择颜色", prop: "color",slot:'color',span:8},
                    {label: "需求类型", prop: "type",span:8},
                    {label: "需求提交人", prop: "createUser",span:8},
                    {label: "正式需求编号", prop: "formalCode",span:8}
                ]
            },

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
    methods: {
        searchFormUpdata(value){
           console.log(value)

        },
        result(res){
            return res.data

        },
        rowClick(value) {

            this.$message.success(JSON.stringify(value))
        },
        save(value) {

            this.$message.success(JSON.stringify(value))
        },
        clickMenuButton(value) {
            this.$message.success(JSON.stringify(value))
        }
    }
};
</script>

<style scoped></style>
