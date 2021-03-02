<template lang="pug">
    el-input-number(
        v-bind="$attrs"
        v-on="evet"
        class="kem-input-number__body"
        :controls-position="controlsPosition"
        :controls='controls'
        :precision='precision'
        :step='step'
        style='width:100%;'
        :placeholder="placeholder")
</template>
<script>
/**
 * @displayName 数字输入框
 */
export default {
    name: 'KemInputNumber',
    props: {
        placeholder: {
            type: String,
            default: '请输入数字'
        },
        controlsPosition:{
            type:String,
            default: 'right'
        },
        controls:{
            type: Boolean,
            default: true
        },
        //precision 的值必须是一个非负整数，并且不能小于 step 的小数位数
        // eslint-disable-next-line vue/require-default-prop
        precision:{
            type: Number,

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
<style lang="scss">
.kem-input-number__body.is-controls-right .el-input__inner{
    text-align: left!important;

}

</style>
