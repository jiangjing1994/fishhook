<template>
  <div class="kem-table__body">
    <avue-crud
            ref="crud"
            v-model="obj"
            :data="crudData"
            :option="computedOption"
            :page="page"
            :table-loading="loading"
            :search-solt="true"
            :row-style="rowStyle"
            @size-change="sizeChange"
            @current-change="currentChange"
            @sort-change="sortChange"
            @row-update="rowUpdate"
            @row-click="rowClick"
            @cell-click="cellClick"
            @expand-change="expandChanges"
     >

      <template
              v-for="(item,key) in column"
              :slot="item.prop"
              slot-scope="scope"
      >
        <render-content
                v-if="item.render"
                :key="key"
                :render="item.render"
                :scope="scope"
                :column="item"
        ></render-content>
          <slot :name="item.prop"  :scope="scope"></slot>
      </template>

      <template slot="menuLeft">
        <slot name="menuLeft"></slot>
      </template>

      <template slot="menuRight">
        <slot name="menuRight"></slot>
        <KemButton v-if="menuPermissionAdd" @click="clickMenuButton({type:'add'})">新增</KemButton>
      </template>

      <template v-if="!loading" slot="expand" slot-scope="scope">
        <slot
                name="expand"
                :scope="scope"
        />
      </template>

      <template v-if="!loading" slot="menu" slot-scope="scope">
        <KemButton v-if="menuPermissionEdit"
                   type="operate.edit"
                   @click="clickMenuButton({row:scope.row,type:'edit'})"
        ></KemButton>
        <KemButton
                v-if="menuPermissionDel"
                type="operate.del"
                @click="clickMenuButton({row:scope.row,type:'del'})"
        />

        <slot
                name="menu"
                :scope="scope"
        />
      </template>


    </avue-crud>
  </div>
</template>

<script lang="jsx">

import { cloneDeep } from 'lodash'

const defaultPage = {
  pageSizes: [5, 10, 20, 50],
  currentPage: 1,
  total: 0,
  pageSize: 20
};

// 表格字段格式化
const RenderContent = {
  props: {
    render: Function,
    scope: Object,
    column: Object,

  },
  render (h) {
    const { row } = this.scope
    const { prop } = this.column
    const params = {
      column:this.column,
      row:row,
      value:row[prop]

    }


    if (this.render) {
      return this.render(h, params)
    }

    return <el-tag>{row[prop]}</el-tag>
  }
}

export default {
  name: 'KemTable',
  components:{
    RenderContent
  },
  props: {

    readOnly:{
      type:Boolean,
      default:false
    },


    tableData: {
      type: Array,
      default:()=>{
        return []
      }
    },

    column: {
      type: Array,
      default:()=>{
        return []
      }
    },


    /**
     * sizie尺寸
     * medium| small| mini
     */
    size:{
      type: String,
      default:'small'
    },

    /**
     * 字体位置
     * medium| small| mini
     */
    align:{
      type: String,
      default:'center'
    },

    /**
     * 行展开
     */
    expand:{
      type:Boolean,
      default:false
    },

    /**
     * 分页器
     */
    pageOption: {
      type: Object,
      default:()=>{
        return{
          pageSizes: [5, 10, 20, 50],
          pageSize: 20
        }
      }
    },
    /**
     * 操作栏宽度
     * width| small| mini
     */
    menuWidth: {
      type:Number,
      default:200
    },
    menuButton:{
      type:Array,
      default:()=>{
        return[]
      }
    },
    /**
     * 是否显示分页器
     */
    isShowPage:{
      type:Boolean,
      default:true
    },

    /**
     * 是否显示边框
     */
    isShowBorder:{
      type:Boolean,
      default:true
    },

    /**
     * 是否显示斑马线
     */
    isShowStripe:{
      type:Boolean,
      default:true
    },
    /**
     * 是否显示索引
     */
    isShowIndex:{
      type:Boolean,
      default:true
    },
    /**
     * 是否显示表头
     */
    isShowHeader:{
      type:Boolean,
      default:true
    },
    /**
     * 默认参数
     */
    defaultParams: {
      type: Object,
      default:()=>{
        return{

        }
      }
    },
    /**
     * 参数转义
     */
    defaultProps: {
      type: Object,
      default:()=>{
        return{
          currentPage: 'pageNo',
          pageSize: 'pageSize',
          order: 'order',
          prop: 'prop',
          total: 'page_size',

        }
      }
    },

    // eslint-disable-next-line vue/require-default-prop
    request:{
      type:Function,
    },
    // eslint-disable-next-line vue/require-default-prop
    result:{
      type:Function,
    },
    // eslint-disable-next-line vue/require-default-prop
    url:{
      type:String,
    },
    // eslint-disable-next-line vue/require-default-prop
    tableHeight:{
      type:Number,
    },
  },

  data() {
    return {
      crudData:[],
      // 分页器
      page: {
        //总条数,如果为0的话不显示分页
        total:1
      },
      obj:{},
      sort: {},
      loading:false,
      expandRowKeys:[]


    }
  },

  computed: {
    computedOption(){
      let option = {
        indexLabel:'序号',

        page:false,
        delBtn:false,
        addBtn:false,
        editBtn:false,
        refreshBtn:false,
        columnBtn:false,
        height:this.tableHeight,
        index:this.isShowIndex,
        showHeader:this.isShowHeader,
        size:this.size,
        align:this.align,
        menuAlign:this.align,
        border:this.isShowBorder,
        stripe:this.isShowStripe,
        menuWidth:this.menuWidth,
        rowKey:'$index',
        expandRowKeys:this.expandRowKeys,
        expand: this.expand,
      }

      if (this.isShowPage){
        option.page = true
      }
      const header = !!(this.$scopedSlots.menuLeft || this.$scopedSlots.menuRight)||this.menuPermissionAdd;



      const menu = !!(this.$scopedSlots.menu )||this.menuPermissionDel ||this.menuPermissionEdit

      return{
        ...option,
        header,
        menu,
        column:this.column
      }
    },


    menuPermissionDel() {
      return  this.menuPermission(['delBtn','allBtn'])
    },
    menuPermissionAdd() {
      return  this.menuPermission(['addBtn','allBtn'])

    },
    menuPermissionEdit() {
      return  this.menuPermission(['editBtn','allBtn'])
    },
  },



  watch: {
    tableData:{
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
    /**
     * 判断权限
     */
    menuPermission(value){

      const menuButton = this.menuButton

      return value.some(r=> menuButton.includes(r)>0)


    },

    async getListData(params={}){


      const defaultParams = this.defaultParams

      const { currentPage , pageSize } = this.page

      const { order , prop } = this.sort

      const request = this.request

      if(request){

        this.loading = true

        const res = await request({
          [this.defaultProps['currentPage']] :currentPage,
          [this.defaultProps['pageSize']] :pageSize,
          [this.defaultProps['order']] :order,
          [this.defaultProps['prop']] :prop,
          ...defaultParams,
          ...params
        })

        let data = res

        const  result  = this.result

        if(result){

          data  = await result(res)

        }

        this.loading=false

        this.page.total =  res[this.defaultProps['total']]

        this.crudData = data
      }else {
        this.crudData = this.tableData
      }

    },
    /**
     * 表格渲染
     */
    renderTable(){
      this.resetPage()

      this.getListData()

    },
    /**
     * 重置分页器分页器
     */
    resetPage(){

      this.page = {
        ...cloneDeep(defaultPage),
        ...cloneDeep(this.pageOption)

      }

    },

    /**
     * 分页器每页条数改变
     */
    sizeChange(val) {

      this.page.currentPage = 1
      this.page.pageSize = val
      this.getListData()
    },

    /**
     * 当前页数改变
     */
    currentChange(val) {
      this.page.currentPage = val
      this.getListData()
    },

    /**
     * 排序
     */
    sortChange(val) {
      const { order,prop } = val
      this.sort.order = order
      this.sort.prop = prop
      this.getListData()
    },
    /**
     * 列展开手风琴
     */
    expandChanges(row, expendList) {
      if (expendList.length) {
        this.expandRowKeys = []
        if (row) {
          this.expandRowKeys.push(row.$index)
        }
      } else {
        this.expandRowKeys = []
      }
      this.$emit('expandChanges',{row, expendList})
    },

    // 表格增加一行
    rowCellAdd(row){
      this.$refs.crud.rowCellAdd(row);
    },

    // 当行内编辑点击保存时
    rowUpdate(form,index,done,loading){
      loading()
      done()
      this.$emit('rowUpdate',this.crudData,{form,index,done,loading})
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

    // 点击操作栏的删除按钮
    clickMenuButton(value){

      const {type} = value
      if(type ==='del'){
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('clickMenuButton',{...value})
        })
      }else {
        this.$emit('clickMenuButton',{...value})
      }

    },

  }

}



</script>

<style lang='scss'>
.kem-table__body{
  overflow: auto;
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

