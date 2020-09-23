<template>
  <div class="linktable__body">
    <EditForm
      ref="addEdit"
      :dialog-type="dialogType"
      :read-only="readOnly"
      :form-items="computedFormItems"
      @submitForm="saveEditAdd"
      @dialogOpen="dialogOpen"
      @updataFormData="updataFormData"
    >
      <slot name="dialogContent" />
    </EditForm>
    <div class="linktable__title">
      <slot name="tableTitle" />
    </div>
    <avue-crud
      v-if="reload"
      ref="crud"
      v-model="obj"
      :data="tableData"
      :option="option"
      :page="computedPage"
      :table-loading="loading"
      :search-solt="true"
      :row-style="rowStyle"
      :span-method="objectSpanMethod"
      @size-change="sizeChange"
      @current-change="currentChange"
      @sort-change="sortChange"
      @selection-change="selectionChange"
      @row-update="rowUpdate"
      @row-click="rowClick"
      @cell-click="cellClick"
    >
      <!--      <render-content-->
      <!--        slot-scope="scope"-->
      <!--        v-if="item.labelRender"-->
      <!--        :slot="label"-->
      <!--        :render="item.labelRender"-->
      <!--        :data="item"-->
      <!--      />-->

      <template slot="menuLeft">
        <div style="display: flex">
          <div>
            <slot name="menuLeft" />
          </div>
        </div>
      </template>
      <template slot="menuRight">
        <div style="display: flex">
          <slot name="menuRight" />

          <Button
            v-if="addBtn"
            @click="addEdit()"
          >
            新增
          </Button>
          <Button
            v-if="selection && showDelListButton"
            :disabled="!(selectionRow.ids.length > 0)"
            type="danger"
            @click="delAllSelection"
          >
            批量删除
          </Button>
          <Button
            v-if="showExportButton"
            type="warning"
            @click="exportExcl"
          >
            导出
          </Button>
        </div>
      </template>
      <!--      <slot-->
      <!--        v-if="!loading"-->
      <!--        slot="menu"-->
      <!--        slot-scope="scope"-->
      <!--        name="menu"-->
      <!--        :scope="scope"-->
      <!--      />-->
      <template
        v-if="!loading"
        slot="menu"
        slot-scope="scope"
      >
        <SpecialButton
          v-if="detailBtn"
          type="operate#detail"
          @click="detailAddEdit(scope.row)"
        >
          查看
        </SpecialButton>
        <SpecialButton
          v-if="editBtn"
          type="operate#edit"
          @click="addEdit(scope.row)"
        >
          编辑
        </SpecialButton>
        <SpecialButton
          v-if="delBtn"
          type="operate#del"
          @click="del(scope.row)"
        >
          删除
        </SpecialButton>
        <slot
          name="menu"
          :scope="scope"
        />
      </template>
    </avue-crud>
  </div>
</template>

<script>
import request from '@/utils/request'
import { result } from '@api/result'
import EditForm from './EditForm'
import { getDictList,queryDictByDictType } from '@api'

import { cloneDeep } from 'lodash'

const defaultPage = {
    pageSizes: [5, 10, 20, 50],
    currentPage: 1,
    total: 0,
    pageSize: 20
};
const defaultOption={
    //menu:false,
    // selection: true,
    // index:true,
    indexLabel:'序号',
    page:true,
    align:'center',
    menuAlign:'center',
    delBtn:false,
    addBtn:false,
    editBtn:false,
    refreshBtn:false,
    columnBtn:false,
    border:false,
    menuWidth:200,
}

export default {
    name: 'BaseTable',
    components:{
        EditForm
    },

    props: {
        // 默认开启多选
        selection:{
            type:Boolean,
            default:false
        },
        readOnly:{
            type:Boolean,
            default:false
        },
        // 行主键多选必传 默认id
        rowKey:{
            type:String,
            default:'id'
        },


        // todo 临时 对话框的类型
        dialogType:{
            type:String,
            default:'default'
        },


        //  是否显示批量删除的按钮 默认显示
        showDelListButton:{
            type:Boolean,
            default:false
        },

        //  是否显示导出按钮 默认不显示显示
        showExportButton:{
            type:[String,Boolean],
            default:false
        },

        // 新增按钮
        addBtn:{
            type:Boolean,
            default:false
        },

        // 编辑按钮
        editBtn:{
            type:Boolean,
            default:false
        },

        //
        detailBtn:{
            type:Boolean,
            default:false
        },

        // 删除按钮
        delBtn:{
            type:Boolean,
            default:false
        },

        // 新增编辑form配置
        formItems:{
            type:Array,
            default:()=>{
                return[]
            }
        },

        url:{
            type:[String,Boolean],
            required:true
        }
        ,
        column: {
            type: Array,
            default:()=>{
                return []
            }
        },
        // 默认参数
        defaultParams: {
            type: Object,
            default:()=>{
                return{

                }
            }
        },
        // 默认转义字段（增量）
        defaultProps: {
            type: Object,
            default:()=>{
                return{
                    // id:'prodId'
                }
            }
        },

        // 是否自动合并单元格
        autoMergeCells : {
            type: Object,
            default:()=>{
                return{
                    isOpen:false,
                }
            }
        },

        customOption: {
            type: Object,
            default:()=>{
                return{

                }
            }
        },

        // eslint-disable-next-line vue/require-default-prop
        resultChange:{
            type:Function,
            required: false
        },
        data:{
            type:Array,
            default:()=>{
                return[]
            }
        },

        // 是否显示分页
        isShowPage:{
            type:Boolean,
            default:true
        }
    },

    data() {
        return {
            // 分页器
            page: {
                //总条数,如果为0的话不显示分页
                total:0
            },
            obj:{},
            sort: {},
            option:{},
            loading:false,
            reload:false,
            tableData: [],
            selectionRow:{
                ids:[],
                list:[]
            },
            spanArr: [],
            position:0
        }
    },

    computed: {
        computedPage(){
            if (this.isShowPage){
                return this.page
            }else {
                return {
                    total: 0,
                }
            }
        },

        computedFormItems() {
            //if(this.addBtn || this.editBtn|| this.detailBtn ){
                // todo 似乎不是最优
               // return this.formItems

           // }
            return this.formItems||[]
        },
    },



    watch: {
        data:{
            handler() {
                this.getListData()
            },
            deep: true
        },
        defaultParams: {
            handler() {
                this.resetPage()
                this.getListData()
            },
            deep: true
        },
        column: {
            handler() {

                this.renderTable()
            },
            deep: true
        },
    },

    created() {

        this.renderTable()
    },
    methods: {
        // 内置表单发生了改变
        updataFormData(value,oldValue){
            this.$emit('updataFormData',value,oldValue)

        },

        // 关闭table中的所有对话框
        closeAllDialog(){
            this.$refs['addEdit'].isShow = false

        },
        //保存编辑或者新增
        saveEditAdd(value){
            this.$emit('saveEditAdd',value)

        },

        //对话框打开
        dialogOpen(value){
            this.$emit('dialogOpen',value)

        },
        //点击操作按钮编辑或者新增
        clickOperateButton(value){
            this.$emit('clickOperateButton',value)
        },

        // 点击编辑或新增
        addEdit(row){
            if(row){
                // 编辑
                this.clickOperateButton({type:'edit',row})
                this.$refs['addEdit'].show({
                    isEdit:true,
                    title:'编辑',
                    row
                })
            }else {
                // 新增
                this.clickOperateButton({type:'add',row:{}})

                this.$refs['addEdit'].show({
                    isEdit:false,
                    title:'新增'
                })


            }

        },


        // 点击查看详情
        detailAddEdit(row){
            if(row){
                // 编辑

                this.$refs['addEdit'].onlyReadShow({
                    title:'详细信息',row

                })


            }

        },



        // getaddform赋值

        addEditFormSetData(value){
            this.$refs['addEdit'].setData(value)

        } ,

        // 点击操作栏的删除按钮
        del(row){
            this.$confirm('此操作将永久删除该条记录, 是否继续?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.clickOperateButton({type:'del',row})

                this.$emit('saveDelete',row)
            })
        },
// 批量删除
        delAllSelection(){
            const { ids } = this.selectionRow

            this.$confirm(`此操作将永久删除选中的 ${ids.length} 条记录, 是否继续?`, '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                this.$emit('handleDelListSelection',this.selectionRow)

                const res = await request({
                    url:'/vue-admin-template/crud/delete',
                    method: 'post',
                    data:{
                        ids
                    }
                }).catch((error) => {
                    console.log(error);
                });

                const data = await result(res,true).catch((error) => {
                    console.log(error);
                });
                if(data){
                    this.getListData()
                }
            })

            console.log(ids)

        },


// 导出
        exportExcl(){
            //todo 待开发
            if(this.showExportButton instanceof Boolean){
                console.log(1234)
            }
        },

        getRowKeyIds(){

        },

// 多选
        selectionChange(list){

            this.ids = list.map(item=>{
                if (item[this.rowKey] === undefined){
                    throw new Error(`Need rowKey !!!!!!!`)
                }
                return item[this.rowKey]
            })
            const selectionRow = {
                ids:this.ids,
                list
            }
            this.selectionRow = selectionRow

            this.$emit('selectionChange',selectionRow)
        },

        /**
         * 表格渲染
         */
        renderTable(){
            let flageAsyncDict = false

            let column = []

            this.column.map((item,index)=>{
                if (item.asyncDict){
                    flageAsyncDict = true
                    this.getDictData({item,dictType:item.asyncDict},item.prop,true)
                }
                else if(item.asyncNoMockDict){
                    flageAsyncDict = true
                    this.getDictData({item,dictType:item.asyncNoMockDict},item.prop)
                }

                if(!item.hidden){
                    column.push({overHidden:true,...item})
                }

            })

            const option = {...cloneDeep(defaultOption),...this.customOption}

            const selection = this.selection

            const header = !!(this.$slots.menuLeft || this.$slots.menuRight);

            this.option = {
                ...cloneDeep(option),
                column,
                header,
                selection,
            }
            this.resetPage()
            if (!flageAsyncDict){ //定义了AsyncDict 属性 则不调用
                this.getListData()
            }

        },

        /**await queryDictByDictType(type),false
         * 加载字典
         */
        async getDictData ({dictType,item},prop,isMock) {



            let res = []

            if(isMock){

                res = await result(await getDictList({type: dictType}) , false)

            }else {

                if(dictType === 'SelectService'){



                    const {params:{url,defaultProps,query}} = item

                    if(!url){
                        throw new Error('params:url 不能为空')
                    }

                    if(!defaultProps){
                        throw new Error('params:defaultProps 不能为空')
                    }

                     const data = await request({
                        url,
                        method: 'get',
                        params:{
                            ...query
                        }
                    })


                    res = await result(data,false)




                    res = res.map(item=>{
                        return{
                            // ...item,
                            label: item[defaultProps['label']],
                            value:item[defaultProps['value']]
                        }
                    })

                }else {
                    res = await result(await queryDictByDictType(dictType) , false)

                    res = res.map(item=>{
                        return{
                            // ...item,
                            label: item.dictName,
                            value:item.dictCode
                        }
                    })
                }



            }


            let { column } = this.option

            column = column.map(item=>{
                if (item.prop === prop){
                    return{
                        ...item,
                        dicData:res
                    }
                }
                return item
            })
            //column[index].dicData = res

            this.option.column = column

            console.log(this.option)
            // this.resetPage()



            // todo 临时多个字典加载的时候有bug
            setTimeout(()=>{
                this.reload = false
                this.getListData()
            },500)




        },
        /**
         * 重置分页器分页器
         */
        resetPage(){
            this.page = cloneDeep(defaultPage)
            //this.sort = {}
        },

        sizeChange(val) {
            this.page.currentPage = 1
            this.page.pageSize = val
            this.getListData()
        },

        currentChange(val) {
            this.page.currentPage = val
            this.getListData()
        },

        sortChange(val) {
            const { order,prop } = val
            this.sort.order = order
            this.sort.prop = prop
            this.getListData()
        },

        async getListData ( params={}) {
            this.loading = true
            this.reload = true
            const defaultParams = this.defaultParams
            const { currentPage , pageSize } = this.page
            const { order , prop } = this.sort
            const url = this.url


            // const i = setTimeout(()=>{
            //   this.loading=false
            // },3000)

            if(url === false){
                this.tableData = this.data
                this.loading=false
                return
            }

            const res = await request({
                url,
                method: 'get',
                params:{
                    // pageNum:currentPage,
                    pageNo:currentPage,
                    pageSize,
                    order,
                    prop,
                    ...defaultParams,
                    ...params
                }
            }).catch((error) => {
                this.loading=false
                throw new Error(error)
            });

            let data = await result(res,false).catch((error) => {
                throw new Error(error)
            });

            const { resultChange } = this

            if(resultChange){

                data  = resultChange(data)

            }


            if(data instanceof Array){
                data = data.map(item=>{


                    for (let i in this.defaultProps){
                        item[this.defaultProps[i]]=item[i]
                    }
                    return{
                        ...item,
                    }
                })
            }
            this.tableData = data
            //this.total = res.page_size
            this.page.total =  res.page_size
            this.$emit('getListSuccess',{
                data
            })
            //clearTimeout(i);

            this.rowspan()
            this.loading = false
        },


// 表格增加一行
        rowCellAdd(row){
            this.$refs.crud.rowCellAdd(row);
        },

// 当行内编辑点击保存时

        rowUpdate(form,index,done,loading){
            loading()
            done()
            this.$emit('rowUpdate',this.tableData,{form,index,done,loading})
        },
        // 当某个单元格被点击时会触发该事件

        cellClick(	row, column, cell, event){

            this.$emit('cellClick',{
                row, column, cell, event
            })
        },

        // 当某一行被点击时会触发该事件

        rowClick(row,event,column){

            this.$emit('rowClick',{
                row, column, event
            })

        },


// 单元格样式
        rowStyle({rowIndex}){

            const basestyles ={
                padding :'8px 12px',
                height:'45px',
                lineHeight :'45px'
            }
            if(rowIndex%2===0){
                return {
                    ...basestyles,
                    backgroundColor:'#ffffff',

                }
            }else {
                return {
                    ...basestyles,

                    backgroundColor:'#F8FAFB',
                }
            }
        },



// 自动计算合并单元格
        rowspan() {
            const {isOpen ,field } = this.autoMergeCells
            if(!isOpen) return
            if(!field) {
                throw new Error("field is undefined!")
            }
            this.tableData.forEach((item,index) => {
                if( index === 0){
                    this.spanArr.push(1);
                    this.position = 0;
                }else{
                    if(this.tableData[index][field] === this.tableData[index-1][field] ){
                        this.spanArr[this.position] += 1;
                        this.spanArr.push(0);
                    }else{
                        this.spanArr.push(1);
                        this.position = index;
                    }
                }
            })
        },

        objectSpanMethod({ row, column, rowIndex, columnIndex }) {  //表格合并行
            const {isOpen ,colNum = 0} = this.autoMergeCells
            if(!isOpen) return

            if (columnIndex === colNum) {
                const _row = this.spanArr[rowIndex];
                const _col = _row>0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
            // if(columnIndex === 1){
            //   const _row = this.spanArr[rowIndex];
            //   const _col = _row>0 ? 1 : 0;
            //   return {
            //     rowspan: _row,
            //     colspan: _col
            //   }
            // }
        },

        getData(){
            return this.tableData
        },


    }

}

</script>

<style lang='scss'>
@import "~@/styles/element-variables.scss";
.linktable__body{
  .linktable__title{
    padding: 10px 0;
    font-size: 14px;
    color: #333333;
    font-weight: bold;
  }
  .avue-crud{
    .el-table{
      border: 1px solid #d9ecff !important;
      border-bottom: 0px solid #d9ecff !important;
    }
    width: 98%!important;
    .el-card{
      // border: 0;
      .el-card__body{
        padding: 10px 0;
        .avue-crud__header{
          margin-bottom: 0;
        }
        .avue-crud__menu{
          height: auto;
          min-height: 0;
          // margin-bottom: 0;
          display: flex;
          justify-content: space-between;
          .avue-crud__left, .avue-crud__right{
            overflow: auto;
            position: inherit;
            >button{
              margin-bottom: 5px;
            }
          }


        }
      }
      .avue-crud__tip{
        display: none;
      }


      .my-tag{
        background-color: #ecf5ff;
        display: inline-block;
        height: 32px;
        padding: 0 10px;
        line-height: 30px;
        font-size: 12px;
        color: #409eff;
        border: 1px solid #d9ecff;
        border-radius: 4px;
        box-sizing: border-box;
        white-space: nowrap;
        margin: 3px 0;
      }


    }
  }

}

</style>

