<template>
    <avue-crud :data="data" :option="option"></avue-crud>
</template>
<script>
export default {
    name:'KemTable',
    data() {
        return {
            data: [
                {
                    name:'张三',
                    sex:'男'
                }, {
                    name:'李四',
                    sex:'女'
                }
            ],
            option:{
                align:'center',
                menuAlign:'center',
                menuWidth:400,
                viewBtn:true,
                menuTitle:'其它',
                addTitle: '保存标题',
                editTitle: '编辑标题',
                viewTitle: '查看标题',
                searchBtnText:'搜索文案',
                emptyBtnText:'清空文案',
                addBtnText:'新增文案',
                delBtnText:'删除文案',
                editBtnText:'编辑文案',
                viewBtnText:'查看文案',
                printBtnText:'打印文案',
                excelBtnText:'导出文案',
                updateBtnText:'修改文案',
                saveBtnText:'保存文案',
                cancelBtnText:'取消文案',
                printBtn:true,
                excelBtn:true,
                column:[
                    {
                        label:'姓名',
                        prop:'name',
                        search:true
                    }, {
                        label:'性别',
                        prop:'sex',
                        search:true
                    }
                ]
            },
        };
    },
    methods: {

    }
}</script>
<style lang="scss" >

</style>
