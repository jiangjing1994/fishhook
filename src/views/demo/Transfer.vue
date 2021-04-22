<template>
  <div style="text-align: left">
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
    renderContent(h, option,click) {
         return  <span onClick={()=>{
        click(option)
      }}>{ option.key } - { option.label }sdsd</span>;
    }
  },
}
</script>

<style lang="scss" scoped></style>
