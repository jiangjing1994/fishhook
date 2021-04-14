
<template>
    <div class="kem-checkbox_group">
        <el-checkbox-group v-bind="$attrs" :value='v' :disabled="isdisabled" v-on="evet" >
            <el-checkbox v-for="(item,index) in list " :border='border' :key="index"  :label="item.value" :disabled="item.disabled">{{item.label}}</el-checkbox>
        </el-checkbox-group>
    </div>

</template>
<script>
import mixins from "../../mixins/async_form_element";
/**
 * @displayName CheckboxGroup复选框
 */
export default {
    name: 'KemCheckboxGroup',
    mixins: [mixins],
    props: {

        border:{
            type: Boolean,
            default:false
        },

        multiple: {
            type: Boolean,
            default: true
        },

        // 数据类型 array string
        valueDataType:{
            type: String,
            default:'array'
        },

        // 分隔符
        separator:{
            type: String,
            default:','
        },


    },
    data() {
        return {
            data: [],
            dataType:'Array'
        }
    },
    computed:{
        v(){
            let value = []

            if(!this.$attrs.value){
                return  []
            }
            if (this.valueDataType === 'array'){
                value = this.$attrs.value
            }else if (this.valueDataType === 'string') {
                value = this.$attrs.value.split(this.separator)
            }
            return value || []
        },
        isdisabled(){
            return this.$attrs.isdisabled || this.uiType ==="text"
        },

    },

 }
</script>

<style>
.kem-checkbox_group .el-checkbox__input.is-disabled+span.el-checkbox__label{
    color: inherit;
}

</style>
