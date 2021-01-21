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
export default {
    name: "SimpaleTable",
    data() {
        return {
            menuButton: ["allBtn", "addBtn", "delBtn"],
            menuOption: {
                delBtn: true
            },
            expand: true,
            data: [
                { name: "张三", sex: "男" ,},
                { name: "李四", sex: "女" },
                { name: "王五", sex: "不详" }
            ],
            column: [
                {
                    label: "姓名",
                    prop: "name",


                },
                {
                    label: "性别",
                    prop: "sex",
                    slot:true
                }
            ]
        };
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
