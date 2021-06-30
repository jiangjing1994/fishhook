<template>
    <KemTable
            :column="column"
            :menu-button="menuButton"
            :request="request"
            :result="result"
            :default-params="defaultParams"
            :menu-width="250"
            :selection="true"
            @selectionChange="selectionChange"
            @clickMenuButton="clickMenuButton"
    />
</template>

<script>
    import { queryList } from '../../utils'
    export default {
        name: 'SelectionTable',
        data() {
            return {
                defaultParams: {},
                request: queryList,
                menuButton: ['allBtn', 'addBtn', 'delBtn'],

                column: [
                    { label: '业务需求编号', prop: 'code' },
                    { label: '需求主题', prop: 'title' },
                    { label: '需求类型', prop: 'type' },
                    { label: '需求提交人', prop: 'createUser' },
                    { label: '需求提交时间', prop: 'createTime' },
                    { label: '正式需求编号', prop: 'formalCode' },
                ],
            }
        },
        methods: {
            result(res) {
                return res.data
            },
            selectionChange(value) {
                 this.$message.success(JSON.stringify(value.ids))
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
