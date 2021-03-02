<template lang="pug">
    div
        KemLabelText( v-if='uiType ==="text"' :value='label')
        el-input( v-bind="$attrs" v-else v-on="evet" :placeholder="placeholder")
            slot(slot="prefix" name="prefix")
            slot(slot="append" name="append")

</template>
<script>
/**
 * @displayName Input 输入框
 */
export default {
    name: 'KemInput',
    props: {
        placeholder: {
            type: String,
            default: '请输入'
        },
        uiType:{
            // text normal
            type: String,
            default: 'normal'
        },
    },
    computed:{
        evet(){
            return this.$listeners;
        },
        label(){
            return this.$attrs.value;
        },
    },
}
</script>

