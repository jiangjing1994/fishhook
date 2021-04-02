<template>
    <div style="position: relative">
        <template v-if="uiType==='default'">
            <KemDialog :visible.sync="visible" :modal-append-to-body="false" :close-on-click-modal="true" @save="save">
                <template slot="header">
                <span>
                    {{ title }}
                    <el-tooltip v-if="content" class="item" effect="dark" :content="content" placement="right-end">
                        <el-button type="text" icon="el-icon-info"></el-button>
                    </el-tooltip>
                </span>

                </template>
                <Condition v-model="computedvalue" language="sql" style="width: 100%;height: 500px;margin-top: 10px" :form-items="formItems"></Condition>
            </KemDialog>
            <KemButton type="operate.edit" @click="handleButton">{{ buttonText }}</KemButton>
        </template>
        <template v-else>
            <Condition v-model="computedvalue" style="padding: 10px;background-color: #f8f8f8" :form-items="formItems"></Condition>

        </template>


    </div>
</template>
<script>

import Condition from './Condition'
/**
 * @displayName ChooseArrayElement 数组元素构造器
 */
export default {
    name: 'KemChooseArrayElement',
    components:{
        Condition
    },

    props: {
        value: {
            type: [Array,String],
            default:()=>{
                return []
            }
        },
        // 数据类型 array string
        valueDataType:{
            type: String,
            default:'array'
        },
        // 显示类型 inline default
        uiType:{
            type: String,
            default:'default'
        },
        buttonText: {
            type: String,
            default: '详细信息'
        },
        content: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '详细信息'
        },
        formItems: {
            type: Array,
            required:true
        },

    },

    data() {
        return {
            visible: false,

        }
    },

    computed: {

        computedvalue: {
            get () {

                if (this.valueDataType === 'string'){
                     if((!this.value) || (this.value instanceof Array && this.value.length === 0) ) return []
                    return JSON.parse(this.value)

                }else {
                    return this.value
                }

            },
            set (v) {

                if (this.valueDataType === 'string'){

                    if(!v) {
                        this.$emit('input', '')
                        return
                    }
                    this.$emit('input', JSON.stringify(v))

                }else{
                    this.$emit('input', v)
                }
            }
        },

    },

    methods: {
        handleButton(){
            this.visible = !this.visible

        },
        save(){
            /*    this.$emit('input', this.computedvalue)
                this.$message.success('修改成功')*/
            this.visible = !this.visible
        }
    },
}
</script>

<style scoped>


</style>
