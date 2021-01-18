<template>
    <div style="position: relative">
        <KemDialog :visible.sync="visible"  :modal-append-to-body="false" @save="save" :closeOnClickModal="true">
            <template slot="header">
                <span >
                    {{title}}
                    <el-tooltip class="item" effect="dark" :content="content" placement="right-end">
                        <el-button type="text" icon="el-icon-info"></el-button>
                    </el-tooltip>
                </span>

            </template>
            <Condition v-model="computedvalue"  language="sql" style="width: 100%;height: 500px;margin-top: 10px" :form-items="formItems"></Condition>
        </KemDialog>
        <KemButton type="operate.edit" @click="handleButton">{{buttonText}}</KemButton>
    </div>
</template>
<script>

import Condition from './Condition'
export default {
    name: 'KemChooseArrayElement',
    components:{
        Condition
    },

    props: {
        value: {
            type: Array,
           // default: ''
        },
        buttonText: {
            type: String,
            default: '编辑'
        },
        content: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '代码编辑器'
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
                return this.value
            },
            set (v) {
                this.$emit('input', v)
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
