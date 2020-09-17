<template>
  <div>
    <div style="width: 800px;margin: 0 auto;">
      <KemForm
        ref="editForm"
        :form-items="formItems"
        :form-config="formConfig"
        :data="form"
      >
        <div slot="actRange2">
          <el-select
            v-model="form.actRange2"
            style="width: 100%"
            placeholder="请选择活动区域"
          >
            <el-option
              label="区域一"
              value="shanghai"
            />
            <el-option
              label="区域二"
              value="beijing"
            />
          </el-select>
        </div>
      </KemForm>
      <el-button @click="submit">
        submit
      </el-button>
    </div>
  </div>
</template>
<script lang="jsx">
export default {
  components: {

  },
  data() {
    return {
      form: {
        date: '',
        name: '',
        address: 'default address',
        actRange: '',
        actRange2: ''
      },
      formConfig: {
        labelWidth: '120px'
      },
      formItems: [
        {
          label: '日期',
          prop: 'date',
          component: 'datePicker',
          labelRender: () => {
            return (
              <span>
              <el-tooltip effect="light" placement="left">
              <template slot="content">
              请选择日期
              </template>
              <i class="label-tip-icon el-icon el-icon-question"></i>
              </el-tooltip>
            日期:
              </span>
            )
          },
          md: 12,
          sm: 12,
          rules: [
            { required: true, trigger: 'change', message: '请选择日期' }
          ]
        },
        {
          label: '姓名',
          prop: 'name',
          component: 'input',
          props: {
            placeholder: 'please enter name'
          },
          md: 12,
          sm: 12,
          rules: form => {
            return form.date
              ? [{ required: true, trigger: 'blur', message: '请输入姓名' }]
              : []
          }
        },
        {
          label: '地址',
          prop: 'address',
          component: 'input',
          props: {
            disabled: true,
            placeholder: 'please enter address'
          }
        },
        {
          label: '活动',
          prop: 'activity',
          component: 'input',
          showIf: () => false,
          props: {
            disabled: true,
            placeholder: 'please enter activity'
          }
        },
        {
          label: '范围1',
          prop: 'actRange1',
          component: 'select',
          showIf: () => true,
          props: {
            style: {
              width: '100%'
            },
            disabled: false,
            placeholder: 'please enter activity'
          }
        },
        {
          label: '范围2',
          prop: 'actRange2',
          showIf: () => true,
          slot: 'actRange2'
        }
      ]
    }
  },
  methods: {
    async submit () {
      const valid = await this.$refs.editForm.validate()
      if (!valid) {
        return
      }
      console.log(this.form)
    }
  }
}
</script>

