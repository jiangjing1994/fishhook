<template>
  <KemTable
    :table-data="data"
    :column="column"
    :menu-option="menuOption"
    :menu-button="menuButton"
    @rowClick="rowClick"
    @clickMenuButton="clickMenuButton"
  >
    <template slot="menuLeft"></template>
    <template slot="menuRight">
      sas
    </template>
  </KemTable>
</template>

<script>
export default {
    name: "Table",
    data() {
        return {
            menuButton:['allBtn','addBtn','delBtn'],
            menuOption:{
                delBtn:true
            },
            data: [
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {name:'张三', sex:'男'},
                {
                    name:'李四',
                    sex:'女'
                }
            ],
            column:[
                {
                    label:'姓名',
                    prop:'name'
                }, {
                    label:'性别',
                    prop:'sex'
                }
            ]
        }
    },
    methods: {
        rowClick() {
            console.log(3232)

        },
        clickMenuButton(value){
            console.log(value)
        }
    },
}
</script>

<style scoped>

</style>
