<template>
  <div>
    <avue-crud v-loadmore="handelLoadmore" :data="filteredData" :option="option" :data-size="tableData.length"></avue-crud>
    <KemTable :big-data="true" :table-height="300" :table-data="tableData" :column="option.column" />

  </div>

</template>
<script>
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
        selection:true,
        index:true,
        selectionFixed:false,
        expandFixed:false,
        menuFixed:false,
        column:[{
          label:'姓名',
          prop:'name',
          width:200,
        },{
          label:'年龄',
          prop:'sex'
        }]
      },
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
      while (cont < 10000) {
        cont = cont + 1;
        let object = {
          id:cont,
          name: '王小虎' + cont,
          sex:cont
        }
        tableData.push(object);
      }
      setTimeout(() => {
        this.tableData = tableData;
      }, 0);
    }
  }
}
</script>
