<template>
  <div class="kem-table__body">
    <div v-if="headerPermission" v-loading="loading && !autoRefresh" class="header_body">
      <div v-if="headerTopPermission" class="header__body-top">
        <slot name="menuTop"></slot>
      </div>
      <div v-if="headerCenterPermission" class="header__body-center">
        <div class="header__body-left">
          <slot name="menuLeft"></slot>
        </div>
        <div class="header__body-right">
          <slot name="menuRight"></slot>
          <KemButton v-if="menuPermissionAdd" @click="clickMenuButton({ type: 'add' })">新增</KemButton>
        </div>
      </div>
      <div v-if="headerBottomPermission" class="header__body-bottom">
        <div v-if="headerSearchPermission">
          <!--表格默认的搜索组件 -->
          <KemSearch v-model="searchForm" v-bind="searchProps" />
        </div>
        <div>
          <slot name="menuBottom"></slot>
        </div>
      </div>
    </div>

    <grid
      ref="crud"
      v-model="obj"
      v-loadmore="handelLoadmore"
      :data-size="tableData.length"
      :data="filteredData"
      :option="computedOption"
      :page.sync="page"
      :table-loading="loading && !autoRefresh"
      :search-solt="true"
      :row-style="methodsRowStyle"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
      @size-change="sizeChange"
      @current-change="currentChange"
      @header-click="headerClick"
      @sort-change="sortChange"
      @row-contextmenu="rowContextmenu"
      @row-update="rowUpdate"
      @cell-dblclick="cellDblclick"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
      @cell-click="cellClick"
      @on-load="onLoad"
      @tree-load="treeLoad"
      @expand-change="expandChanges"
      @selection-change="selectionChange"
    >
      <!--      <template slot="typeHeader" slot-scope="{ column }">-->
      <!--        <el-tag>{{ (column || {}).label }}-{{ (column || {}).prop }}</el-tag>-->
      <!--      </template>-->
      <template v-for="(item, key) in headerColumn" :slot="item.prop + 'Header'" slot-scope="{ column }">
        <slot :name="item.prop + 'Header'" :column="column"></slot>
      </template>
      <template v-for="(item, key) in computedOption.column" :slot="item.prop" slot-scope="scope">
        <!--开发中-->
        <render-content
          v-if="item.render"
          :key="key"
          :render="item.render"
          :scope="scope"
          :column="item"
        ></render-content>

        <component
          :is="item.component"
          v-if="item.component"
          :key="key"
          :ref="item.ref || `cp-${scope.row.$index}-${item.prop}`"
          v-model="crudData[scope.row.$index][item.prop]"
          :data="crudData[scope.row.$index]"
          v-bind="item.props"
          v-on="item.listeners"
        />

        <span v-if="!item.nativeSlot && !item.component" :key="key">{{ scope.row[item.prop] }}</span>

        <slot v-else :name="item.prop" :scope="scope"></slot>
      </template>

      <!-- <template slot="menuLeft">
                 <slot name="menuLeft"></slot>
             </template>
             <template slot="menuRight">
                 <slot name="menuRight"></slot>
                 <KemButton v-if="menuPermissionAdd" @click="clickMenuButton({type:'add'})">新增</KemButton>
             </template>-->

      <template v-if="!loading" slot="expand" slot-scope="scope">
        <slot name="expand" :scope="scope" />
      </template>

      <!--      <template v-if="!loading" slot="menu" slot-scope="scope">-->
      <!-- todo test-->
      <template v-if="relodaMenu" slot="menu" slot-scope="scope">
        <KemButton
          v-if="menuPermissionDetail"
          :type="`${menuButtonType}.detail`"
          @click="clickMenuButton({ row: scope.row, type: 'detail' })"
        />
        <KemButton
          v-if="menuPermissionEdit"
          :type="`${menuButtonType}.edit`"
          @click="clickMenuButton({ row: scope.row, type: 'edit' })"
        ></KemButton>

        <KemButton
          v-if="menuPermissionDel"
          :type="`${menuButtonType}.del`"
          @click="clickMenuButton({ row: scope.row, type: 'del' })"
        />

        <slot name="menu" :scope="scope" />
      </template>
    </grid>
  </div>
</template>

<script lang="jsx">
import { cloneDeep, debounce, get, isExitsVariable, handleTree } from '../../utils'

const defaultPage = {
  pageSizes: [5, 10, 20, 50],
  currentPage: 1,
  total: 0,
  pageSize: 20,
}

// 表格字段格式化
const RenderContent = {
  props: {
    render: Function,
    scope: Object,
    column: Object,
  },
  render(h) {
    const { row } = this.scope
    const { prop } = this.column
    const params = {
      column: this.column,
      row: row,
      value: row[prop],
    }

    if (this.render) {
      return this.render(h, params)
    }

    return <el-tag>{row[prop]}</el-tag>
  },
}

const getRowIdentity = (row, rowKey) => {
  if (!row) throw new Error('row is required when get row identity')
  if (typeof rowKey === 'string') {
    if (rowKey.indexOf('.') < 0) {
      return row[rowKey]
    }
    let key = rowKey.split('.')
    let current = row
    for (let i = 0; i < key.length; i++) {
      current = current[key[i]]
    }
    return current
  } else if (typeof rowKey === 'function') {
    return rowKey.call(null, row)
  }
}
/**
 * @displayName Table 配置化表格
 */
export default {
  name: 'KemTable',
  directives: {
    loadmore: {
      componentUpdated: function (el, binding, vnode, oldVnode) {
        // 设置默认溢出显示数量
        var spillDataNum = 20

        // 设置隐藏函数
        var timeout = false
        let setRowDisableNone = function (topNum, showRowNum, binding) {
          if (timeout) {
            clearTimeout(timeout)
          }
          timeout = setTimeout(() => {
            binding.value.call(null, topNum, topNum + showRowNum + spillDataNum)
          })
        }
        setTimeout(() => {
          const dataSize = vnode.data.attrs['data-size']
          const oldDataSize = oldVnode.data.attrs['data-size']
          if (dataSize === oldDataSize) return
          const selectWrap = el.querySelector('.el-table__body-wrapper')
          const selectTbody = selectWrap.querySelector('table tbody')
          const selectRow = selectWrap.querySelector('table tr')
          if (!selectRow) {
            return
          }
          const rowHeight = selectRow.clientHeight
          let showRowNum = Math.round(selectWrap.clientHeight / rowHeight)

          const createElementTR = document.createElement('tr')
          let createElementTRHeight = (dataSize - showRowNum - spillDataNum) * rowHeight
          createElementTR.setAttribute('style', `height: ${createElementTRHeight}px;`)
          selectTbody.append(createElementTR)

          // 监听滚动后事件
          selectWrap.addEventListener('scroll', function () {
            let topPx = this.scrollTop - spillDataNum * rowHeight
            let topNum = Math.round(topPx / rowHeight)
            let minTopNum = dataSize - spillDataNum - showRowNum
            if (topNum > minTopNum) {
              topNum = minTopNum
            }
            if (topNum < 0) {
              topNum = 0
              topPx = 0
            }
            selectTbody.setAttribute('style', `transform: translateY(${topPx}px)`)
            createElementTR.setAttribute(
              'style',
              `height: ${createElementTRHeight - topPx > 0 ? createElementTRHeight - topPx : 0}px;`
            )
            setRowDisableNone(topNum, showRowNum, binding)
          })
        })
      },
    },
  },

  components: {
    RenderContent,
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },

    tableData: {
      type: Array,
      default: () => {
        return []
      },
    },

    column: {
      type: Array,
      default: () => {
        return []
      },
    },

    /**
     * sizie尺寸
     * @values medium| small| mini
     */
    size: {
      type: String,
    },

    /**
     * 列跟菜单对齐方式 支持$MIMI
     * @values center| left| right
     */
    align: {
      type: String,
    },

    /**
     * 行展开
     */
    expand: {
      type: Boolean,
      default: false,
    },

    /**
     * 分页器
     */
    pageOption: {
      type: Object,
    },
    /**
     * 操作栏宽度 支持$MIMI
     * @values width| small| mini
     */
    menuWidth: {
      type: Number,
    },
    /**
     * 定时刷新
     */
    waitRefresh: {
      type: Number,
    },
    menuButton: {
      type: Array,
      default: () => {
        return []
      },
    },
    /**
     * 是否显示分页器
     */
    isShowPage: {
      type: Boolean,
      default: true,
    },

    /**
     * 是否显示边框 支持$MIMI
     */
    isShowBorder: {
      type: Boolean,
      default: undefined,
    },

    /**
     * 是否显示斑马线 支持$MIMI
     */
    isShowStripe: {
      type: Boolean,
      default: undefined,
    },
    /**
     * 是否显示索引 支持$MIMI
     */
    isShowIndex: {
      type: Boolean,
      default: undefined,
    },
    /**
     * 是否显示表头 支持$MIMI
     */
    isShowHeader: {
      type: Boolean,
      default: undefined,
    },
    /**
     * 合并选项 支持option下的所有属性及props没有暴露的属性 支持$MIMI方式
     */
    mergeOption: Object,
    /**
     * 是否开启多选 支持$MIMI
     */
    selection: {
      type: Boolean,
      default() {
        return this.$MIMI.Table.selection
      },
    },

    /**
     * 默认参数
     */
    defaultParams: {
      type: Object,
      default: () => {
        return {}
      },
    },

    /**
     * 表格是否根据queryParams变化自动 刷新数据 默认 true
     */
    autoRefresh: {
      type: Boolean,
      default: true,
    },

    /**
     * 参数转义
     */
    defaultProps: Object,

    /**
     * 分页参数转义
     */
    orderProps: Object,
    /**
     * 异步方法
     */
    request: Function,

    /**
     * 结果处理
     */
    result: Function,

    /**
     * 行样式 $Mimi
     */
    rowStyle: Function,

    treeLoad: {
      type: Function,
      default: () => {
        return {}
      },
    },
    /**
     * 表格高度
     */
    tableHeight: {
      type: Number,
    },

    /**
     * 索引显示文字
     */
    indexLabel: {
      type: String,
    },

    /**
     * 菜单按钮滴样式
     */
    menuButtonType: {
      type: String,
      default: 'text',
    },

    /**
     * 单元格超出隐藏
     */
    columnOverHidden: {
      type: Boolean,
      default: true,
    },

    /**
     * rowkey
     */
    rowKey: {
      type: String,
      default: '$index',
    },
    /**
     * 搜索框的传值
     */
    searchProps: {
      type: [Object, Boolean],
      default: false,
    },

    /**
     * 树的传值
     */
    treeProps: {
      type: [Object, Boolean],
      default: false,
    },

    /**
     * 大数模式
     */
    bigData: {
      type: Boolean,
      default: false,
    },

    /**
     * 分页选中
     */
    reserveSelection: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      searchForm: {},
      crudData: [],
      // 分页器
      page: {
        //总条数,如果为0的话不显示分页
        total: 1,
      },
      obj: {},
      sort: {},
      loading: false,
      relodaMenu: false,
      expandRowKeys: [],
      selectedKeys: [],
      currentStartIndex: 0,
      currentEndIndex: 20,
      timer: null,
    }
  },
  computed: {
    filteredData() {
      if (this.bigData) {
        return this.tableData.filter((item, index) => {
          if (index < this.currentStartIndex) {
            return false
          } else return index <= this.currentEndIndex
        })
      } else {
        return this.crudData
      }
    },

    tableIsShowIndex() {
      if (this.bigData) {
        return false
      }
      return isExitsVariable(this.isShowIndex) ? this.isShowIndex : this.$MIMI.Table.isShowIndex
    },
    tableIndexLabel() {
      return this.indexLabel || this.$MIMI.Table.indexLabel
    },
    tableIsShowHeader() {
      return isExitsVariable(this.isShowHeader) ? this.isShowHeader : this.$MIMI.Table.isShowHeader
    },
    tableSize() {
      return this.size || this.$MIMI.Table.size
    },
    tableIsShowStripe() {
      return isExitsVariable(this.isShowStripe) ? this.isShowStripe : this.$MIMI.Table.isShowStripe
    },
    tableIsShowBorder() {
      return isExitsVariable(this.isShowBorder) ? this.isShowBorder : this.$MIMI.Table.isShowBorder
    },
    tableMenuWidth() {
      return this.menuWidth || this.$MIMI.Table.menuWidth
    },
    tableIsAlign() {
      return this.align || this.$MIMI.Table.align
    },
    tablePageOption() {
      return this.pageOption || this.$MIMI.Table.pageOption
    },
    tableDefaultProps() {
      return this.defaultProps || this.$MIMI.Table.defaultProps
    },
    tableOrderProps() {
      return this.orderProps || this.$MIMI.Table.orderProps
    },
    tableSelection() {
      return this.selection
    },
    tableMergeOption() {
      return this.mergeOption || this.$MIMI.Table.mergeOption
    },

    headerColumn() {
      const column = this.computedOption.column ?? []
      return column.filter((item) => item.headerslot)
    },

    computedOption() {
      const lazy = this.treeProps.lazy || false
      let option = {
        ...this.tableMergeOption,
        indexLabel: this.tableIndexLabel,
        index: this.tableIsShowIndex,
        page: false,
        delBtn: false,
        addBtn: false,
        editBtn: false,
        reserveSelection: this.reserveSelection,
        refreshBtn: false,
        columnBtn: false,
        height: this.tableHeight,
        showHeader: this.tableIsShowHeader,
        size: this.tableSize,
        align: this.tableIsAlign,
        menuAlign: this.tableIsAlign,
        selection: this.tableSelection,
        border: this.tableIsShowBorder,
        stripe: this.tableIsShowStripe,
        menuWidth: this.tableMenuWidth,
        rowKey: this.rowKey,
        expandRowKeys: this.expandRowKeys,
        expand: this.expand,
        lazy: lazy,
        selectionFixed: false,
      }

      if (this.isShowPage) {
        option.page = true
      }
      const header = !!(this.$scopedSlots.menuLeft || this.$scopedSlots.menuRight) || this.menuPermissionAdd

      const menu =
        !!this.$scopedSlots.menu || this.menuPermissionDel || this.menuPermissionEdit || this.menuPermissionDetail

      const column = this.column.map((item) => {
        item = {
          ...item,
        }

        item.nativeSlot = !!item.slot
        item.slot = true
        item.overHidden = this.columnOverHidden
        return item
      })

      return {
        ...option,
        header,
        menu,
        column,
      }
    },
    queryParams() {
      return {
        ...this.defaultParams,
        ...this.searchForm,
      }
    },

    menuPermissionDetail() {
      return this.menuPermission(['detailBtn', 'allBtn'])
    },

    menuPermissionDel() {
      return this.menuPermission(['delBtn', 'allBtn'])
    },

    menuPermissionAdd() {
      return this.menuPermission(['addBtn', 'allBtn'])
    },

    menuPermissionEdit() {
      return this.menuPermission(['editBtn', 'allBtn'])
    },

    headerTopPermission() {
      return !!this.$scopedSlots.menuTop
    },

    headerCenterPermission() {
      return !!(this.$scopedSlots.menuLeft || this.$scopedSlots.menuRight || this.menuPermissionAdd)
    },

    headerBottomPermission() {
      return !!(this.$scopedSlots.menuBottom || this.headerSearchPermission)
    },

    headerSearchPermission() {
      return !!this.searchProps
    },

    headerPermission() {
      return !!(
        this.headerTopPermission ||
        this.headerCenterPermission ||
        this.headerBottomPermission ||
        this.menuPermissionAdd
      )
    },
  },

  watch: {
    searchForm: {
      handler(value) {
        /** 搜索条件改变
         * @event searchFormUpdata
         * @type {Event}
         */
        this.$emit('searchFormUpdata', value)
      },
      deep: true,
    },
    tableData: {
      handler() {
        this.getListData()
      },
      deep: true,
    },
    defaultParams: {
      handler() {
        // this.refreshDefaultParams()
      },
      deep: true,
    },
    queryParams: {
      handler() {
        if (this.autoRefresh) {
          this.refreshDefaultParams()
        }
      },
      deep: true,
    },
    column: {
      handler() {
        // this.renderTable()
      },
      deep: true,
    },
    waitRefresh: {
      handler() {
        if (this.waitRefresh) {
          this.timer = setInterval(() => {
            this.getListData()
          }, this.waitRefresh)
        } else {
          if (this.timer) {
            clearTimeout(this.timer)
            this.getListData()
          }
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },

  created() {
    this.renderTable()
  },
  methods: {
    /**
     * 判断权限
     */
    menuPermission(value) {
      const menuButton = this.menuButton

      return value.some((r) => menuButton.includes(r) > 0)
    },

    refreshDefaultParams: debounce(function () {
      this.resetPage()
      this.getListData()
    }, 500),

    async getListData(params = {}) {
      try {
        const queryParams = this.queryParams

        const { currentPage, pageSize } = this.page

        const { order, prop } = this.sort

        const request = this.request

        if (request) {
          this.loading = true
          try {
            const res = await request({
              [this.tableDefaultProps['currentPage']]: currentPage,
              [this.tableDefaultProps['pageSize']]: pageSize,
              [this.tableDefaultProps['order']]: this.tableOrderProps[order],
              [this.tableDefaultProps['prop']]: prop,
              ...queryParams,
              ...params,
            })
            this.expandRowKeys = []
            this.$emit('getDataListSuccess', res)

            // let data = res
            let data = get(res, this.tableDefaultProps['data'])

            const result = this.result

            if (result) {
              data = (await result(res)) || []
            }

            this.loading = false

            // this.page.total = res[this.tableDefaultProps['total']]
            this.page.total = get(res, this.tableDefaultProps['total']) || 0
            //this.crudData = data
            this.setCrudData(data)
          } catch (error) {
            this.loading = false

            throw new Error(error)
          }
        } else {
          this.setCrudData(this.tableData)
        }
      } catch {
        this.crudData = []
      }
    },
    /**
     * 给crudData 赋值
     */
    setCrudData(tableData) {
      if (this.treeProps) {
        const { loop } = this.treeProps || false
        if (loop) {
          const table = cloneDeep(tableData)
          this.crudData = handleTree(table, this.treeProps['id'], this.treeProps['pid'], this.treeProps['children'])
          //this.crudData = this.getTree(tableData, '')
        } else {
          this.crudData = tableData
        }
      } else {
        this.crudData = tableData
      }
      this.relodaMenu = false
      this.$nextTick(() => {
        if (this.reserveSelection) {
          this.toggleIdSelection(this.selectedKeys, true)
        }
        this.relodaMenu = true
      })
    },
    /**
     * 表格渲染
     */
    renderTable() {
      this.resetPage()

      this.getListData()
    },
    /**
     * 重置分页器分页器
     */
    resetPage() {
      this.page = {
        ...cloneDeep(defaultPage),
        ...cloneDeep(this.tablePageOption),
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
      const { order, prop } = val
      this.sort.order = order
      this.sort.prop = prop
      this.getListData()
    },
    /**
     * 多选
     */
    selectionChange(list) {
      const ids = list.map((item) => {
        if (item[this.rowKey] === undefined) {
          throw new Error(`Need rowKey !!!!!!!`)
        }
        return item[this.rowKey]
      })

      this.selectedKeys = ids
      this.$emit('selectionChange', {
        ids,
        list,
      })
    },

    /** 手风琴展开
     * @param {object} row 描述
     * @param {array} expendList
     */
    expandChanges(row, expendList) {
      /** 手风琴展开
       * @event expandChanges
       * @type {Event}
       */
      this.$emit('expandChanges', { row, expendList })
      if (this.treeProps) return

      if (this.bigData) return
      if (expendList.length) {
        this.expandRowKeys = []
        if (row) {
          this.expandRowKeys.push(row.$index)
        }
      } else {
        this.expandRowKeys = []
      }
    },

    // 表格增加一行
    rowCellAdd(row) {
      this.$refs.crud.rowCellAdd(row)
    },

    // 表格增加一行
    columnInit(row) {
      this.$refs.crud.rowCellAdd(row)
      this.$refs.crud.columnInit()
    },

    // 当行内编辑点击保存时
    rowUpdate(form, index, done, loading) {
      loading()
      done()
      this.$emit('rowUpdate', this.crudData, { form, index, done, loading })
    },
    //清空排序
    clearSort() {
      this.$refs.crud.clearSort()
    },
    //当单元格 hover 进入时会触发该事件
    cellMouseEnter(row, column, cell, event) {
      //单元格 hover 进入时会触发该事件
      this.$emit('cell-mouse-enter', { row, column, cell, event })
    },
    //当单元格 hover 退出时会触发该事件
    cellMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', { row, column, cell, event })
    },

    //	当某一列的表头被点击时会触发该事件
    headerClick(column, event) {
      this.$emit('header-click', { column, event })
    },
    //当某一行被鼠标右键点击时会触发该事件
    rowContextmenu(row, column, event) {
      this.$emit('row-contextmenu', { row, column, event })
    },

    //当某个单元格被双击击时会触发该事件
    cellDblclick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    },

    onLoad(page) {
      this.$emit('on-load', page)
    },
    cellClick(row, column, cell, event) {
      /** 单元格被点击
       * @event cellClick
       * @type {Event}
       */
      this.$emit('cellClick', {
        row,
        column,
        cell,
        event,
      })
    },

    // 当某一行被点击时会触发该事件
    rowClick(row, event, column) {
      /** 某一行被点击
       * @event rowClick
       * @type {Event}
       */
      this.$emit('rowClick', {
        row,
        column,
        event,
      })
    },

    rowDblclick(row, event) {
      /** 行双击
       * @event rowClick
       * @type {Event}
       */
      this.$emit('rowDblclick', {
        row,
        event,
      })
    },

    // 单元格样式
    methodsRowStyle({ rowIndex, row }) {
      // const rowStyle = this.rowStyle || basestyles
      const rowStyle = this.rowStyle || this.$MIMI.Table.rowStyle

      return rowStyle({ rowIndex, row })
    },

    // 点击操作栏的删除按钮
    clickMenuButton(value) {
      const { type } = value
      if (type === 'del') {
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$emit('clickMenuButton', { ...value })
        })
      } else {
        /** 点击菜单按钮
         * @event clickMenuButton
         * @type {Event}
         */
        this.$emit('clickMenuButton', { ...value })
      }
    },

    // 手动渲染
    loadNode(row) {
      const table = this.$refs.crud.$refs.table.store
      const { states, loadData, toggleTreeExpansion } = table

      const { treeData, rowKey, lazy } = states
      const id = getRowIdentity(row, rowKey)
      const data = treeData[id]
      data.loaded = false

      if (lazy && data && 'loaded' in data && !data.loaded) {
        loadData(row, id, data)
      } else {
        toggleTreeExpansion(row)
      }
    },

    handelLoadmore(currentStartIndex, currentEndIndex) {
      this.currentStartIndex = currentStartIndex
      this.currentEndIndex = currentEndIndex
      this.$emit('handelLoadmore', currentStartIndex, currentEndIndex)
    },

    toggleRowSelection(row, selected) {
      this.$refs.crud.toggleRowSelection(row, selected)
    },
    toggleIdSelection(ids, selected) {
      const rowKey = this.rowKey
      if (this.rowKey) {
        try {
          if (ids && ids instanceof Array) {
            this.filteredData
              .filter((item) => ids.some((i) => i === item[rowKey]))
              .forEach((row) => {
                this.$refs.crud.toggleRowSelection(row, selected)
              })
          }
        } catch (e) {
          throw new Error(e)
        }
      } else {
        throw new Error(`Need rowKey !!!!!!!`)
      }
    },
  },
}
</script>

<style lang="scss">
.kem-table__body {
  // overflow: auto;
  .grid {
    .grid__menu {
      display: none;
    }
    .grid__tip {
      display: none !important;
    }
    .el-table {
      border: 1px solid #d9ecff !important;
      border-bottom: 0px solid #d9ecff !important;
    }
    .el-table--striped .el-table__body tr.el-table__row--striped td {
      //  background-color: inherit;
    }
    width: 100% !important;
    .el-card {
      // border: 0;
      .el-card__body {
        padding: 10px 0;
        .grid__header {
          margin-bottom: 0;
        }
        .grid__menu {
          height: auto;
          min-height: 0;
          // margin-bottom: 0;
          display: flex;
          justify-content: space-between;
          .grid__left,
          .grid__right {
            overflow: auto;
            position: inherit;
            > button {
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }
  .header_body {
    padding: 0 0;
    margin-bottom: 15px;
    .header__body-top {
      margin-bottom: 15px;
    }
    .header__body-center {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;

      .header__body-left {
        width: 49.5%;
        text-align: left;
      }
      .header__body-right {
        width: 49.5%;
        text-align: right;
      }
    }
    .header__body-bottom {
    }
  }
}
</style>
