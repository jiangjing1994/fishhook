<template>
  <div class="search__body">
    <div class="btn">
      <KemButton type="success" @click="showIf = !showIf"> {{ !showIf?'展开':'隐藏' }}</KemButton>
      <KemButton type="danger" @click="clear"> 清空</KemButton>

    </div>
    <KemForm
            v-if="showIf"
            ref="form"
            style="margin-top: 10px"
            :form-config="formConfig"
            :form-items="formItems"
            :data="form"
            :form-rules="formRules"
            :read-only="readOnly"
            :alias="alias"
            :is-form-group="isFormGroup"
    >
    </KemForm>

  </div>
</template>
<script>
export default {
  name: 'KemSearch',
  // eslint-disable-next-line vue/require-prop-types
  props:['formConfig', 'formItems', 'formRules',  'alias', 'isFormGroup','readOnly','value'],
  data() {
    return {
      showIf:true,
      form:{},
    }
  },

  watch: {

    value: {
      handler (value) {
        this.form = value
      },
      deep:true,
      immediate:true
    },

    form: {
      handler (value) {
        this.$emit('input', value);
      },
      deep:true
    }
  },
  methods: {
    clear() {
      this.form = {}
    }
  },
}
</script>

<style lang="scss" scoped>
.search__body{
  width: 100%;
 // position: relative;
  padding: 15px;
 // padding-bottom: 0px;
  box-sizing: border-box;
  background-color: #dff9f9;
  border-radius: 4px;
  .btn{
    text-align: right;
   // margin-bottom: 15px;
    width: 100%;

    >i{
      display: block;
      text-align: center;
      margin: 5px 0;
      cursor: pointer;
      &:hover{
        color: #0f80ff;
      }
    }
  }
}

</style>
