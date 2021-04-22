<template>
  <div style="text-align: left;height: 400px">
    <pre>{{ value }}</pre>
    <KemTransfer
        v-model="value"
        :data="data"
        :render-content="renderContent"
        :selected-panel="selectedPanel"
        :not-selected-panel="notSelectedPanel"
    ></KemTransfer>
    <!--    <el-transfer v-model="value" :data="data"></el-transfer>-->
  </div>
</template>

<script>
export default {
  name: 'Transfer',

  props: {
    propName: {
      type: Number,
      default: 0,
    },
  },
  data() {
    const generateData = () => {
      const data = []
      for (let i = 1; i <= 35; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          //disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [1, 4],
      selectedPanel:{
        label: '已选字段',
        count:true,
        countStyle:{
          background:' rgba(82, 196, 26, .1)',
          color:' rgba(82, 196, 26,1)'
        },
        labelStyle:{},
      },
      notSelectedPanel:{
        label: '可选字段',
        count:true,
        countStyle:{
          background:' rgba(255, 153, 0, .1)',
          color:' rgba(255, 153, 0,1)'
        },
        labelStyle:{},
      },
    }
  },
  methods: {
    // renderContent(h, option,click) {
    //      return  <span onClick={()=>{
    //     click(option)
    //   }}>{ option.key } - { option.label }sdsd</span>;
    // }
    renderContent(h, option,click) {
      let flage = 1
      if(this.value.indexOf(option.key)===-1){
        flage  = 0
      }
      return  <div class="transfer-row" >
        <div>
          <span class="icon">stripe</span>
          <span class="title">{ option.label }</span>
        </div>
        <div class ="btn" onClick={()=>{
          console.log(this.value )
          click(option)
        }}> {flage===0?'+':'-'}</div>
      </div>;
    }
  },
}
</script>

<style lang="scss">
.transfer-row{
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 15px;
  &:hover{
    background: rgba(0, 122, 255, 0.05);
  }
  >div .icon{
    color: rgba(0, 122, 255, 1);
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    background: rgba(0, 122, 255, 0.05);
    // background-color: rebeccapurple;
    border-radius: 4px;
    padding: 0  5px;
    margin-right: 5px;
  }
  >.btn{
    height: 100%;
    padding: 0 10px;
    color: rgba(0, 0, 0, 0.45);
    &:hover{
      color: rgba(0, 122, 255, 1);
      cursor: pointer;

    }

  }


}

</style>
