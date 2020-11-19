<template lang="pug">
    el-checkbox-group( v-bind="$attrs"  v-on="evet"  )
        el-checkbox(v-for="(item,index) in list " :key="index"  :label="item.value" :disabled="item.disabled") {{item.label}}



</template>
<script>
export default {
    name: 'KemCheckboxGroup',
    props: {
        defaultProps: {
            type: Object,
            default:()=>{
                return{
                    label: 'label',
                    value:'value'
                }
            }
        },
        options:{
            type: Array,
            required:true
        },

    },

    computed:{
        list(){
            const { label, value }= this.defaultProps
            return this.options.map(item => {
                return {
                    ...item,
                    label: item[label],
                    value: item[value],
                }
            })
        },
        evet(){
            return this.$listeners;
        },
    },

}
</script>

<style scoped>

</style>
