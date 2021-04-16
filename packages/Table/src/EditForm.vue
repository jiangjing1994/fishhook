<template lang="pug">
  div
    Dialog(:visible.sync="isShow" @save="submitForm" append-to-body v-if="dialogType ==='default'")
      template(slot="title") {{title}}
      FormCard(ref="editForm" v-if='showFormCard' :readOnly="readOnly" :form-items="formItems"  :data="thisForm")
      slot

    BigNullCard(v-else :visible.sync="isShow" @save="submitForm")
      FormCard(ref="editForm" v-if='showFormCard' :form-items="formItems"  :data="thisForm")
      slot

</template>

<script>
import { cloneDeep } from 'lodash'
export default {
  name: 'EditForm',
  props: {
    formItems: {
      type: Array,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    dialogType: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      isShow: false,
      isEdit: false,
      showFormCard: true,
      title: '',
      thisForm: {},
    }
  },
  computed: {
    computedThisForm() {
      return JSON.stringify(this.thisForm)
    },
  },
  watch: {
    computedThisForm: {
      handler(newValue, oldValue) {
        this.$emit('updataFormData', JSON.parse(newValue), JSON.parse(oldValue))
      },
      deep: true,
    },
  },
  methods: {
    show({ title, isEdit, row }) {
      this.title = title
      this.isShow = true
      this.isEdit = isEdit
      if (isEdit) {
        this.thisForm = cloneDeep(row)

        this.$emit('dialogOpen', { isEdit })
      } else {
        this.showFormCard = false
        this.thisForm = {}
        this.$nextTick(() => {
          this.showFormCard = true
          this.$emit('dialogOpen', { isEdit })
        })
      }
    },
    onlyReadShow({ row, title }) {
      this.isShow = true
      this.title = title
      this.thisForm = cloneDeep(row)
    },

    setData(value) {
      this.thisForm = {
        ...this.thisForm,
        ...value,
      }
    },

    async submitForm() {
      if (this.readOnly) {
        this.$message.error('没有修改权限!')
        return
      }
      const valid = await this.$refs.editForm.validate()
      if (!valid) {
        return
      }
      this.$emit('submitForm', { value: this.thisForm, isEdit: this.isEdit })
    },
  },
}
</script>

<style scoped></style>
