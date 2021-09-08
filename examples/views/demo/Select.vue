<template>
  <KemPageCard header="下拉Select">
    <pre>{{ form }}</pre>

    <KemForm ref="form" :form-items="formItems" :data="form"> </KemForm>
    <template slot="footer">
      <KemButton @click="dianwo">切换uiType</KemButton>
    </template>
  </KemPageCard>
</template>

<script>
const transferRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { transferName: '动态数据1', id: 'Beijing' },
        { transferName: '动态数据2', id: 'Shanghai' },
        { transferName: '动态数据3', id: 'Nanjing' },
        { transferName: '动态数据4', id: 'Chengdu' },
        { transferName: '动态数据5', id: 'Shenzhen' },
        { transferName: '动态数据6', id: 'Guangzhou' },
      ])
    }, 500)
  })
}
const transferRequest2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['动态数据1','动态数据2','动态数据3','动态数据4',])
    }, 500)
  })
}
export default {
  name: 'Select',
  data() {
    return {
      uiType: 'text',
      value: '123',
      form: {
       // prop1: 0,
        prop3: 'Nanjing',
        prop4: '这是KemInput',
        prop6: 'shanghai',
      },
    }
  },
  computed: {
    formItems() {
      const uiType = this.uiType
      return [
        {
          label: '静态条件11',
          prop: 'prop00',
          span: 13,
          component: 'KemSelect',
          props: {
            autoSelect: true,
            valueKey:'metricsId',
            defaultProps: {
              label: "metrics.metricsName",
              value: "metrics",
            },
            options: [
              {
                "metrics": {
                  "metricsId": 1,
                  "metricsCode": "cpu_usage",
                  "metricsName": "cpu使用率测试"
                }
              },
              {
                "metrics": {
                  "metricsId": 2,
                  "metricsCode": "cpu_usage2",
                  "metricsName": "cpu使用率测试2"
                }
              }, {
                "metrics": {
                  "metricsId": 3,
                  "metricsCode": "cpu_usage3",
                  "metricsName": "cpu使用率测试3"
                }
              },
            ],
          },
        },
        {
          label: '静态条件',
          prop: 'prop1',
          span: 13,
          component: 'KemSelect',
          props: {
            autoSelect: true,
            options: [
              {
                label: '区域一',
                value: 0,
              },
              {
                label: '区域二',
                value: 'beijing',
              }, {
                label: '区域san',
                value: 'beijingss',
              },
            ],
          },
        },
        {
          label: '动态条件',
          prop: 'prop2',
          span: 13,
          component: 'KemSelect',
          props: {
            request: transferRequest,
            autoSelect: true,
            defaultProps: {
              label: 'transferName',
              value: 'id',
            },
            defaultParams: {
              dictType: 'transfer',
            },
          },
        },
        {
          label: '动态条件2',
          prop: 'prop2',
          span: 13,
          component: 'KemSelect',
          props: {
            request: transferRequest2,
            defaultProps: {},
            defaultParams: {
              dictType: 'transfer',
            },
          },
        },
        {
          label: '文字模式',
          prop: 'prop3',
          span: 13,
          component: 'KemSelect',
          props: {
            request: transferRequest,
            defaultProps: {
              label: 'transferName',
              value: 'id',
            },
            defaultParams: {
              dictType: 'transfer',
            },
            uiType,
          },
        },
        {
          label: '文字模式2',
          prop: 'prop4',
          span: 13,
          props: {
            uiType,
          },
        },
        {
          label: '多选',
          prop: 'prop5',
          span: 13,
          component: 'KemSelect',
          props: {
            multiple: true,
            options: [
              {
                label: '区域一',
                value: 'shanghai',
              },
              {
                label: '区域二',
                value: 'beijing',
              },
            ],
          },
        },
        {
          label: '多选2',
          prop: 'prop6',
          span: 13,
          component: 'KemSelect',
          props: {
            valueDataType: 'string',
            multiple: true,

            options: [
              {
                label: '区域一',
                value: 'shanghai',
              },
              {
                label: '区域二',
                value: 'beijing',
              },
            ],
          },
        },
      ]
    },
  },
  methods: {
    transferRequest,
    dianwo() {
      if (this.uiType === '') {
        this.uiType = 'text'
      } else {
        this.uiType = ''
      }
    },
  },
}
</script>

<style scoped></style>
