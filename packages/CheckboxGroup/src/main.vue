
<template>
    <div class="kem-checkbox_group">
        <el-checkbox-group v-bind="$attrs" :value='v' :disabled="isdisabled" v-on="evet" >
            <el-checkbox v-for="(item,index) in list " :border='border' :key="index"  :label="item.value" :disabled="item.disabled">{{item.label}}</el-checkbox>
        </el-checkbox-group>
    </div>

</template>
<script>
import mixins from "@/mixins/async_form_element";
export default {
    name: 'KemCheckboxGroup',
    mixins: [mixins],
    props: {

        border:{
            type: Boolean,
            default:false
        },


    },
    data() {
        return {
            data: [],
        }
    },
    computed:{
        v(){
            return this.$attrs.value || []
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
