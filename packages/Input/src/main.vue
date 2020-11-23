<template lang="pug">
  el-input( v-bind="$attrs" v-on="evet" :placeholder="placeholder")
    slot(slot="prefix" name="prefix")
    slot(slot="append" name="append")
</template>
<script>
export default {
  name: 'KemInput',
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
  },
  computed:{
    evet(){
      return this.$listeners;
    },
  },
}
</script>

