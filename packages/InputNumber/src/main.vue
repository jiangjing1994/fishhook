<template lang="pug">
    el-input-number(
        v-bind="$attrs"
        v-on="evet"
        :controls-position="controlsPosition"
        :controls='controls'
        :precision='precision'
        :step='step'
        style='width:100%'
        :placeholder="placeholder")
</template>
<script>
export default {
    name: 'KemInputNumber',
    props: {
        placeholder: {
            type: String,
            default: '请输入'
        },
        controlsPosition:{
            type:String,
            default: 'right'
        },
        controls:{
            type: Boolean,
            default: false
        },
        //precision 的值必须是一个非负整数，并且不能小于 step 的小数位数
        precision:{
            type: Number,
            default: 2
        },
        step:{
            type: Number,
            default: 1
        },

},
    computed:{
        evet(){
            return this.$listeners;
        },
    },
}
</script>
