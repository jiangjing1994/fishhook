<template>
  <div style="text-align: left; display: flex; justify-content: center">
    <KemPageCard style="width: 800px; margin-right: 20px" header="Form">
      <pre>{{ form }}</pre>
      <KemForm
        ref="form"
        :data="form"
        :form-items="formItems"
        :form-rules="formRules"
        :form-config="{
          labelPositon:'right'
        }"
         @input="aa"
      >
      </KemForm>
    </KemPageCard>

  </div>
</template>

<script>

export default {
  name: 'Form2',
  data() {
    return{
      form:{
        legendVisible:true,
        legend: {
          type:'plain'
        }
      },
      form2:  {
        "legendVisible": true,
        "legend.type": "plain"
      },
      formRules: {
         'legend.type': [
          { required: true, message: '请输入邮箱地址', trigger: 'change' },
         ],
      },

      formItems: [
        { label: "禁用", prop: "legendVisible", span: 24, component: "el-switch" },
/*
        {
          label: "icon",
          prop: "legend.icon",
          span: 24,
          component: "KemSelect",
          props: {
            options: [
              { label: "circle", value: "circle" },
              { label: "rect", value: "rect" },
              { label: "roundRect", value: "roundRect" },
              { label: "triangle", value: "triangle" },
              { label: "diamond", value: "diamond" },
              { label: "pin", value: "pin" },
              { label: "arrow", value: "arrow" },
              { label: "none", value: "none" },
            ],
          },
        },
*/
        {
          label: "图例的类型",
          prop: "legend.type",
          span: 24,
          component: "KemSelect",
          props: {
            options: [
              { label: "plain", value: "plain" },
              { label: "scroll", value: "scroll" },


            ],
          },
        },
      ],

    }
  },
  methods: {
    aa(a) {
      console.log(a)
      //this.form= a
    }
  },
 }
</script>

<style scoped></style>
