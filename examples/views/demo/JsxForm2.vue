<template>
  <div style="text-align: left; display: flex; justify-content: center">
    <KemPageCard style="width: 800px; margin-right: 20px" header="Form">
      <pre>{{ form }}</pre>
      sss
      <KemJsxForm
        ref="form"
        :form-items="formItems"
        :model="form"
        :row-gutter="10"
        :form-rules="formRules"
        label-suffix=":"
        :form-config="{
          labelPositon: 'right',
        }"
        :read-only="readOnly"
        @updataFormData="updataFormData"
      >
        <template slot="resource">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </template>
        <template slot="labelSuffix"> 3333 </template>
      </KemJsxForm>

      <div slot="footer">
        <KemButton @click="updataFormItems(1)">切换FormItems1</KemButton>
        <KemButton @click="updataFormItems(2)">切换FormItems2</KemButton>
        <KemButton @click="readOnly = !readOnly">只读</KemButton>
        <KemButton @click="submitForm">提交</KemButton>
        <KemButton @click="validate">validate</KemButton>
        <KemButton @click="resetFields">resetFields</KemButton>
        <KemButton @click="clearValidate">clearValidate</KemButton>
      </div>
    </KemPageCard>
  </div>
</template>

<script>
export default {
  name: 'JsxFormDemo2',
  data() {
    return {
      form: {
        name: '123',
        type: [],
      },
      readOnly: false,
      formRules: {
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'change' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['change'] },
        ],
      },
      formItems: [],
      formItems1: [
        // { label: '活动名称', prop: 'name', tip: 'sasa' },
        { label: '电子邮箱', prop: 'email', span: 12, component: 'KemInput' },
        // { label: '人员总数', prop: 'num', span: 12, component: 'KemInputNumber' },
        {
          label: '活动区域2',
          // renderLabel: (h, form, root) => <span style="color: red;"></span>,
          rules: [
            { required: true, message: '请输入邮箱地址', trigger: 'change' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['change'] },
          ],
          prop: 'region',
          span: 24,
          component: 'KemSelect',
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
          label: '二级区域2',
          prop: 'region2',
          span: 24,
          component: 'KemSelect',
          // show: (data) => {
          //   return !data.region
          // },
          props: (data) => {
            return {
              options: [
                {
                  label: data.region,
                  value: '4444',
                },
                {
                  label: '区域一',
                  value: 'shanghai',
                },
                {
                  label: '区域二',
                  value: 'beijing',
                },
              ],
            }
          },
        },
        { label: '即时配送', prop: 'delivery', span: 24, component: 'KemSwitch' },
        {
          label: '活动性质',
          prop: 'type',
          span: 24,
          component: 'KemCheckboxGroup',
          props: {
            options: [
              {
                label: '美食/餐厅线上活动',
                value: 'shanghai',
              },
              {
                label: '地推活动',
                value: 'beijing',
              },
            ],
          },
        },
        {
          prop: 'ab',
          label: 'render方式',
          render: (h, form, root) => {
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
            const props = {
              request: transferRequest,
              defaultProps: {
                label: 'transferName',
                value: 'id',
              },
              defaultParams: {
                dictType: 'transfer',
              },
            }
            return <kem-select {...{ props }} v-model={form.ab} />
          },
        },

        // { label: '特殊资源', prop: 'resource', slot: 'resource', span: 24 },
      ],
      formItems2: [
        { label: '活动名称', prop: 'name', span: 24 },
        {
          label: '二级区域2',
          prop: 'region2',
          span: 24,
          component: 'KemSelect',
          // show: (data) => {
          //   return !data.region
          // },
          props: (data) => {
            return {
              options: [
                {
                  label: data.region,
                  value: '4444',
                },
                {
                  label: '区域一',
                  value: 'shanghai',
                },
                {
                  label: '区域二',
                  value: 'beijing',
                },
              ],
            }
          },
        },
      ],
    }
  },
  created() {
    this.formItems = this.formItems1
  },
  methods: {
    submitForm() {
      this.$refs['form'].validate().then((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updataFormData(newvalue, oldvalue) {
      if (newvalue.name !== oldvalue.name) {
        this.$message.success('活动名称变了')
      }
    },
    updataFormItems(value) {
      if (value === 1) {
        this.formItems = this.formItems1
      } else {
        this.formItems = this.formItems2
      }
    },
    test() {
      console.log(this.$refs.form2.formItemElement())
      this.$refs.form2.formItemElement().clickButtonItem({ value: 'aaa' })
    },
    clickDel(v) {
      console.log(v)
    },
    validate() {
      this.$refs.form.validate((a) => {
        console.log(a)
      })
    },
    resetFields() {
      this.$refs.form.resetFields()
    },
    clearValidate() {
      this.$refs.form.clearValidate()
    },
  },
}
</script>

<style scoped></style>
