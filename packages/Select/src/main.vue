<template lang="pug">
    el-select( v-bind="$attrs"  v-on="evet" :placeholder="placeholder" :filterable='filterable' :clearable='clearable' style='width:100%' )
        el-option(v-for="(item,index) in list " :key="index"  :label="item.label" :disabled="item.disabled" :value="item.value")
            slot(:scope="item")


</template>
<script>
export default {
    name: 'KemSelect',
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
        placeholder: {
            type: String,
            default: '请输入'
        },
        filterable: {
            type: Boolean,
            default: true
        },
        clearable: {
            type: Boolean,
            default: true
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
