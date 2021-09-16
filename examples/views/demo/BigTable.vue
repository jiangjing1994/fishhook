<template>
  <div>
<!--    <avue-crud v-loadmore="handelLoadmore" :data="filteredData" :option="option" :data-size="tableData.length">-->
<!--      <template slot="expand" slot-scope="scope">-->
<!--        {{ scope.row.title }}-->
<!--      </template>-->
<!--    </avue-crud>-->

    <KemTable :big-data="true" :table-height="600" :table-data="tableData" :is-show-header="false" :expand="true" :merge-option="option" :column="column" >
      <template slot="expand" slot-scope="{ scope }">
        {{ scope.row.title }}
      </template>
    </KemTable>>

  </div>

</template>
<script>
import Mock from 'mockjs'
export default {
  name:'BigTable',
  directives:{
    loadmore:{
      componentUpdated: function (el, binding, vnode, oldVnode) {
        // 设置默认溢出显示数量
        var spillDataNum = 20;

        // 设置隐藏函数
        var timeout = false;
        let setRowDisableNone = function (topNum, showRowNum, binding) {
          if (timeout) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(() => {
            binding.value.call(null, topNum, topNum + showRowNum + spillDataNum);
          });
        };
        setTimeout(() => {
          const dataSize = vnode.data.attrs['data-size'];
          const oldDataSize = oldVnode.data.attrs['data-size'];
          if (dataSize === oldDataSize) return;
          const selectWrap = el.querySelector('.el-table__body-wrapper');
          const selectTbody = selectWrap.querySelector('table tbody');
          const selectRow = selectWrap.querySelector('table tr');
          if (!selectRow) {
            return;
          }
          const rowHeight = selectRow.clientHeight;
          let showRowNum = Math.round(selectWrap.clientHeight / rowHeight);

          const createElementTR = document.createElement('tr');
          let createElementTRHeight = (dataSize - showRowNum - spillDataNum) * rowHeight;
          createElementTR.setAttribute('style', `height: ${createElementTRHeight}px;`);
          selectTbody.append(createElementTR);

          // 监听滚动后事件
          selectWrap.addEventListener('scroll', function () {
            let topPx = this.scrollTop - spillDataNum * rowHeight;
            let topNum = Math.round(topPx / rowHeight);
            let minTopNum = dataSize - spillDataNum - showRowNum;
            if (topNum > minTopNum) {
              topNum = minTopNum;
            }
            if (topNum < 0) {
              topNum = 0;
              topPx = 0;
            }
            selectTbody.setAttribute('style', `transform: translateY(${topPx}px)`);
            createElementTR.setAttribute('style', `height: ${createElementTRHeight - topPx > 0 ? createElementTRHeight - topPx : 0}px;`);
            setRowDisableNone(topNum, showRowNum, binding);
          })
        });
      }
    }
  },
  data() {
    return {
      tableData: [],
      option:{
        height:300,
        expand:true,
        expandFixed:false,
        menuFixed:false,
        rowKey:'id',
        showHeader:false,
        column:[
          {
            label:'姓名',
            prop:'name',
            width:200,
          },
          {label:'年龄', prop:'sex'},
          {label:'author', prop:'author'},
          {label:'reviewer', prop:'reviewer'},
          {label:'title', prop:'title',overHidden:true},
          {label:'content_short', prop:'content_short'},
          {label:'forecast', prop:'forecast'},
          {label:'importance', prop:'importance'},
          {label:'type', prop:'type'},

        ],

      },
      column:[
        {
          label:'姓名',
          prop:'name',
          width:200,
        },
        {label:'年龄', prop:'sex'},
        {label:'author', prop:'author'},
        {label:'reviewer', prop:'reviewer'},
        {label:'title', prop:'title'},
        {label:'content_short', prop:'content_short'},
        {label:'forecast', prop:'forecast'},
        {label:'importance', prop:'importance'},
        {label:'type', prop:'type'},
        {label:'status', prop:'status'},
        {label:'display_time', prop:'display_time'},
        {label:'pageviews', prop:'pageviews'},
        {label:'platforms', prop:'platforms'},
        {label:'code', prop:'code'},
        {label:'formalCode', prop:'formalCode'},
        {label:'system', prop:'system'},
        {label:'createUser', prop:'createUser'},
        {label:'createTime', prop:'createTime'},
        {label:'processInstanceId', prop:'processInstanceId'},
      ],

      currentStartIndex: 0,
      currentEndIndex: 20
    };
  },
  computed: {
    filteredData() {
      let list = this.tableData.filter((item, index) => {
        if (index < this.currentStartIndex) {
          return false;
        } else if (index > this.currentEndIndex) {
          return false;
        } else {
          return true;
        }
      });
      return list
    }
  },
  created() {
    this.getTableData();
  },
  methods: {
    handelLoadmore(currentStartIndex, currentEndIndex) {
      this.currentStartIndex = currentStartIndex;
      this.currentEndIndex = currentEndIndex;
      this.$emit('handelLoadmore',currentStartIndex , currentEndIndex)
    },
    getTableData() {
      let cont = 0;
      let tableData = [];
      while (cont < 1000) {
        cont = cont + 1;
        let object =  Mock.mock(
          {
            id:cont,
            name: '王小虎' + cont,
            sex:cont,
            author: '@first',
            reviewer: '@first',
            title: '@title(100, 1000)',
            content_short: 'mock data',
            forecast: '@float(0, 100, 2, 2)',
            importance: '@integer(1, 3)',
            'type|1': ['CN', 'US', 'JP', 'EU'],
            'status|1': ['published', 'draft', 'deleted'],
            display_time: '@datetime',

            comment_disabled: true,
            pageviews: '@integer(300, 5000)',
            platforms: ['a-platform'],

            code: '@increment',
            formalCode: '@increment',

            system: '@title(5, 10)',
            //type: '非市场口需求',
            createUser: '@first',
            createTime: '@datetime',
            dealTime: null,
            formalId: null,
            processInstanceId: '@increment',
          }
        )


        tableData.push(object);
      }
      setTimeout(() => {
        this.tableData = tableData;
      }, 0);
    }
  }
}
</script>
