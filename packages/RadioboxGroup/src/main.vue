<template>

    <div class="kem-radio_group">
        <el-radio-group v-bind="$attrs"  :disabled="isdisabled" v-on="evet">
            <el-radio v-for="(item,index) in list " :key="index" :label="item.value" :disabled="item.disabled">{{ item.label }}</el-radio>
        </el-radio-group>
    </div>


</template>
<script>
import mixins from "@/mixins/async_form_element";

export default {
    name: 'KemRadioboxGroup',
    mixins: [mixins],
    computed:{
        isdisabled(){
            return this.$attrs.isdisabled || this.uiType ==="text"
        },
    },

}
</script>

<style  >
.kem-radio_group .el-radio{
    margin: 9px;
}
.kem-radio_group .el-radio__input.is-disabled+span.el-radio__label{
    color: inherit;
}
</style>
