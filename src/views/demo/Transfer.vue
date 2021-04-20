<template>
  <div style="text-align: left">
    <KemTransfer v-model="value" :data="data"></KemTransfer>
    <el-transfer v-model="value" :data="data"></el-transfer>
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
      for (let i = 1; i <= 15; i++) {
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
    }
  },
  methods: {
    name() {},
  },
}
</script>

<style lang="scss" scoped></style>
