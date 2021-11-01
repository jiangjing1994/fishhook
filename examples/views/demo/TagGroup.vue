<template>
  <KemPageCard header="标签">
    <el-tag>标签一</el-tag>
    <el-tag type="success">标签二</el-tag>
    <kem-tag>标签一</kem-tag>
    <kem-tag closable type="success">标签二</kem-tag>

    <pre>{{ value }}</pre>
    <pre>{{ options }}</pre>
    <KemTagGroup
      v-model="value"
      :options="options"
      style="margin-bottom: 20px"
      @tagAppend="tagAppend"
      @handleTagEditConfirm="handleTagEditConfirm"
      @tagEdit="tagEdit"
      @tagDel="tagDel"
    />
    <KemTagGroup v-model="value" ui-type="closable" :options="options" />
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
export default {
  name: 'TagGroup',
  data() {
    return {
      value: ['shanghai'],
      options: [
        {
          label: '区域一111',
          value: 'shanghai',
          isShow: true,
        },
        {
          label: '区域22',
          value: 'beijing',
          isShow: false,
        },
      ],
      uiType: 'text',
      form: {
        prop3: ['Nanjing'],
        prop4: '这是KemInput',
        prop5: 'beijing',
      },
    }
  },
  computed: {
    formItems() {
      const uiType = this.uiType
      return [
        {
          label: '静态条件',
          prop: 'prop1',
          span: 13,
          component: 'KemTagGroup',
          props: {
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
          label: '动态条件',
          prop: 'prop2',
          span: 13,
          component: 'KemTagGroup',
          props: {
            request: transferRequest,
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
          label: '文字模式',
          prop: 'prop3',
          span: 13,
          component: 'KemTagGroup',
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
          label: '字符串类型',
          prop: 'prop5',
          span: 13,
          component: 'KemTagGroup',
          props: {
            valueDataType: 'string',
            options: [
              {
                label: '区域一',
                value: 'shanghai',
              },
              {
                label: '区域二',
                value: 'beijing',
              },
              {
                label: '区域三',
                value: 'nanjing',
              },
            ],
          },
        },
      ]
    },
  },
  methods: {
    tagDel(v) {},
    tagAppend(v) {
      this.options.push({
        label: v,
        value: v,
      })
    },
    tagEdit(v, index, done) {
      console.log(index)
      this.options = this.options.map((item, i) => {
        if (i === index)
          return {
            ...v,
            isInput: true,
          }
        return {
          ...v,
          isInput: false,
        }
      })

      done()
      // this.$set(this.options, index, {
      //   ...v,
      //   isInput:true
      // })
    },
    handleTagEditConfirm(value, oldItem) {
      console.log(value, oldItem)

      // this.$set(this.options, index, {
      //   ...v,
      //   isInput:true
      // })
    },
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
