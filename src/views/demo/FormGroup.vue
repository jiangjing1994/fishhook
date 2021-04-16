<template>
  <div class="collection-configuration__body">
    <KemForm
      ref="form"
      :form-items="formItems1"
      :is-form-group="true"
      :form-config="{ labelPosition: 'right', size: 'small' }"
      :data="form"
      :form-rules="formRules"
    >
    </KemForm>
    <!--        <el-timeline :reverse="false">-->
    <!--            <el-timeline-item>-->
    <!--                <template slot="dot">-->
    <!--                    <div class="icon__body">-->
    <!--                        <KemSvgIcon icon-class="scenebaseInfo"></KemSvgIcon>-->
    <!--                    </div>-->
    <!--                </template>-->
    <!--                <div class="timeline__title">采集基本信息</div>-->

    <!--            </el-timeline-item>-->
    <!--        </el-timeline>-->
  </div>
</template>

<script>
export default {
  name: 'FormGroup',
  data() {
    return {
      formItems1: [
        {
          label: '表单组1',
          formItems: [
            { label: '活动名称', prop: 'name', span: 24 },
            { label: '电子邮箱', prop: 'email', span: 24 },
            { label: '人员总数', prop: 'num', span: 24, component: 'KemInputNumber' },
          ],
        },
        {
          label: '表单组2',

          formItems: [
            { label: '活动名称', prop: 'name2', span: 24 },
            { label: '电子邮箱', prop: 'email2', span: 24 },
            {
              label: '人员总数',
              prop: 'num2',
              span: 24,
              component: 'KemInputNumber',
              props: {
                asa: 111,
              },
            },
          ],
        },
        {
          label: '结束',
          icon: 'el-icon-finished',
          formItems: [],
        },
      ],
      formRules: {},
      form: {},
    }
  },
}
</script>

<style scoped lang="scss"></style>
