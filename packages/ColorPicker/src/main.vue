<template lang="pug">
    el-color-picker( v-bind="$attrs" v-on="evet" )
</template>
<script>
export default {
    name: 'KemColorPicker',
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
