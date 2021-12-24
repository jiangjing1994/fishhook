<template>
  <div style="text-align: left; display: flex; justify-content: center">
    <KemPageCard style="margin-right: 20px" header="Form">
      <pre>{{ form }}</pre>
      <jsx-form
        ref="jsxFormRef"
        :model="form"
        :form-items="column"
        :rules="rules"
        :form-config="formConfig"
        size="small"
        :row-gutter="20"
        empty-text="--"
      />
    </KemPageCard>
  </div>
</template>

<script>
export default {
  name: 'JsxFormDemo',
  data() {
    return {
      formConfig: {
        labelPosition: 'right',
      },
      form: {
        name: '222',
        age: 18,
        gender: 'male',
        hobby: ['html', 'css', 'js'],
        time: {
          start: new Date().getTime(),
          end: new Date().getTime(),
        },
        skill: [
          {
            name: 'math',
            point: 90,
          },
        ],
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      },
    }
  },
  computed: {
    column() {
      /**
       * 注意：如果不传 render 和 formatter 属性
       * 则需在 <jsx-form> 上通过 :model="form" 绑定
       */
      return [
        // 简易模式
        // 返回数据示例：<span>{{ form.name }}<span>
        {
          prop: 'name',
          label: '姓名',
        },

        // show接收一个方法，根据返回值决定表单项是否显示
        {
          prop: 'custom_hidden',
          label: '自定义隐藏',
          show: (form, root) => false,
        },

        // 使用formatter格式化数据
        // 返回数据示例：<span class="gender-icon>{{ genderNameMap[form.gender] }}</span>
        {
          prop: 'gender',
          label: '性别',
          class: 'gender-icon',
          formatter: (form, root) => {
            const genderNameMap = { male: '男生', female: '女生' }
            return genderNameMap[form.gender]
          },
        },

        /**
         * render: 自定义显示元素
         * 可使用v-model进行双向绑定
         *
         * rules: 可单独设置校验规则
         * renderLabel: 自定义标签文本的内容，参数为 (h, form, root)
         * renderError: 自定义表单校验信息的显示方式，参数为 (h, form, root, {error})
         **/
        {
          prop: 'age',
          renderLabel: (h, form, root) => <span style="color: red;">年龄</span>,
          renderError: (h, form, root, { error }) => <span style="color: blue">{error}</span>,
          rules: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { type: 'number', min: 1, message: 'hahaha', trigger: 'blur' },
          ],
          render: (h, form, root) => (
            <kem-input-number v-model={form.age} onChange={this.handleChange} max={20} label="描述文字" />
          ),
        },

        // 注意Vue中JSX语法的书写规则，部分属性无法传递，需进行包裹后方可传递
        {
          prop: 'hobby',
          label: '兴趣',
          render: (h, form, root) => {
            const options = [
              {
                name: '前端',
                id: 'front',
                children: [
                  {
                    name: 'HTML',
                    id: 'html',
                  },
                  {
                    name: 'JavaScript',
                    id: 'js',
                  },
                  {
                    name: 'CSS',
                    id: 'css',
                  },
                ],
              },
              {
                name: '后端',
                id: 'back',
                children: [
                  {
                    name: 'JAVA',
                    id: 'java',
                  },
                  {
                    name: 'Golang',
                    id: 'golang',
                  },
                  {
                    name: 'Python',
                    id: 'python',
                  },
                ],
              },
            ]
            /**
             * 特别注意
             * 由于 el-cascader 需要传递名称为 'props' 的属性
             * 而在 vue 的 JSX 语法解析中，'props' 属性无法正常传递，所以这里需要特殊处理下
             * 详情可参考 https://www.yuque.com/zeka/vue/vu60wg
             */
            const cascaderProps = {
              options,
              props: {
                checkStrictly: true,
                label: 'name',
                value: 'id',
                multiple: true,
                emitPath: false,
              },
              clearable: true,
              filterable: true,
            }
            return <el-cascader {...{ props: cascaderProps }} v-model={form.hobby} />
          },
        },

        {
          prop: 'aaa',
          label: 'aaa',
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
              // options: [
              //   { label: "circle", value: "circle" },
              //   { label: "rect", value: "rect" },
              //   { label: "roundRect", value: "roundRect" },
              //   { label: "triangle", value: "triangle" },
              //   { label: "diamond", value: "diamond" },
              //   { label: "pin", value: "pin" },
              //   { label: "arrow", value: "arrow" },
              //   { label: "none", value: "none" },
              // ],
              request: transferRequest,
              defaultProps: {
                label: 'transferName',
                value: 'id',
              },
              defaultParams: {
                dictType: 'transfer',
              },
            }
            return <kem-select {...{ props: props }} v-model={form.aaa} />
          },
        },

        /**
         * 嵌套对象的表单 + 快速布局
         *
         * 配置项：children
         * 数据类型：数组（column）
         * 含义：设置对象的 column列
         *
         * 拓展项：layout
         * 数据类型：对象
         * 含义：引入<el-row>和<el-col>进行布局，接受所有参数
         **/
        {
          prop: 'time',
          label: '活动时间',
          layout: {
            type: 'flex',
            align: 'middle',
            justify: 'start',
          },
          children: [
            {
              prop: 'start',
              label: '开始时间',
              layout: {
                span: 10,
              },
              render: (h, form, root) => {
                return <el-date-picker v-model={form.start} />
              },
            },
            {
              prop: 'end',
              label: '结束时间',
              layout: {
                span: 10,
                offset: 1,
              },
              render: (h, form, root) => {
                return <el-date-picker v-model={form.end} />
              },
            },
          ],
        },

        /**
         * 嵌套数组的表单
         *
         * 配置项：item
         * 数据类型：函数
         * 数据结构：(form, root) => column数组
         * 含义：设置数组每一项的数据结构
         *
         * 拓展项：value
         * 数据类型：any
         * 含义：新增数据项时的默认值
         **/
        {
          prop: 'skill',
          label: '能力评级',
          item: (form, root) => {
            return [
              {
                prop: 'name',
                label: '名称',
                render: (h, form, root) => {
                  return <el-input v-model={form.name} />
                },
              },
              {
                prop: 'point',
                label: '评分',
                value: 80,
                show: (form, root, itemIndex) => true,
                render: (h, form, root, { itemIndex }) => {
                  // itemIndex: 当前元素位于数组的index，默认为-1
                  return <el-input-number v-model={form.point} />
                },
              },
            ]
          },
        },
      ]
    },
  },
  methods: {
    handleChange(val) {
      // 这里同样可以使用 el-form 的 Form Methods，同原生 element-ui 的使用方式相同
      this.$refs.jsxFormRef.validateField('age', (err) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(val)
      })
    },
  },
}
</script>
