<template>
  <KemDialog :visible.sync="visible" @save="save">
    <template slot="header"> 默认 </template>
    <KemForm
      ref="form"
      :group="group"
      :data="data"
      :alias="alias"
      :form-items="formItems"
      :form-config="formConfig"
      :formRules="formRules"
      :readOnly="readOnly"
    >
    </KemForm>
    <slot />
  </KemDialog>
</template>

<script>
export default {
  name: 'KemFormDialog',
  props: [
    // eslint-disable-next-line vue/require-prop-types
    'formConfig',
    'formItems',
    'group',
    'data',
    'formRules',
    'readOnly',
    'alias',
  ],
  // eslint-disable-next-line vue/require-prop-types
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    open() {
      this.visible = true
    },
    save() {
      this.visible = false
      this.$emit('save', this.data)
    },
  },
}
</script>

<style scoped></style>
