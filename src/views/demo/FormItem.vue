<template>
  <div>
    {{ value2 }}
    <KemButton @click="updataTransferRequest"> 点击改变下拉查询的条件</KemButton>
    <KemSelect
      v-model="value2"
      :value-clear="true"
      :request="transferRequest"
      :default-params="defaultParams"
      :default-props="{ label: 'transferName', value: 'id' }"
    ></KemSelect>

    <KemSelect v-model="multipleValue" multiple :options="options"></KemSelect>
    <KemSelect v-model="value" :options="options"></KemSelect>

    <KemSelect v-model="value" :options="options">
      <template slot-scope="{ scope }">
        <span style="float: left">{{ scope.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ scope.value }}</span>
      </template>
    </KemSelect>
    <KemInputNumber v-model="number"></KemInputNumber>
    <KemInput v-model="value"></KemInput>
    <KemRadioboxGroup v-model="value" :options="options" />

    <KemCheckboxGroup v-model="multipleValue" border :options="options"></KemCheckboxGroup>
    <KemColorPicker v-model="color"></KemColorPicker>
    <KemInputColor v-model="color"></KemInputColor>
    <KemSwitch v-model="b"></KemSwitch>
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  data() {
    return {
      multipleValue: [],
      value: '',
      dictType: 'transfer',
      value2: '',
      b: null,
      color: '#000',
      number: 3,
      options: [
        {
          value: 'Beijing', label: '北京',
        },
        {
          value: 'Shanghai',
          label: '上海',
        },
        {
          value: 'Nanjing',
          label: '南京',
        },
        {
          value: 'Chengdu',
          label: '成都',
        },
        {
          value: 'Shenzhen',
          label: '深圳',
        },
        {
          value: 'Guangzhou',
          label: '广州',
        },
      ],
    }
  },
  computed: {
    defaultParams() {

      return {
        dictType:
        this.dictType }
    },
  },

  methods: {
    updataTransferRequest() {
      this.dictType = this.dictType === 'asasas' ? 'transfer' : 'asasas'
    },
    transferRequest({ dictType }) {
      let data = []
      if (dictType === 'transfer') {
        data = [
          { transferName: '北京',
            id: 'Beijing' },
          { transferName: '上海', id: 'Shanghai' },
          { transferName: '南京', id: 'Nanjing' },
          { transferName: '成都', id: 'Chengdu' },
          { transferName: '深圳', id: 'Shenzhen' },
          { transferName: '广州', id: 'Guangzhou' },
        ]
      } else {
        data = [
          { transferName: '北京2', id: 'Beijing2' },
          { transferName: '上海2', id: 'Shanghai2' },
          { transferName: '南京2', id: 'Nanjing2' },
          { transferName: '成都2', id: 'Chengdu2' },
          { transferName: '深圳2', id: 'Shenzhen2' },
          { transferName: '广州2', id: 'Guangzhou2' },
        ]
      }
      return new Promise((resolve) => {
        setTimeout(() => {


          resolve(data)
        }, 500)
      })
    },
  },
}
</script>

<style scoped></style>
