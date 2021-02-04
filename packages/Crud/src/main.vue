<template>
    <KemDialog v-if="visible" :visible.sync="visible" @save="save">
        <template slot="header">
            {{ headerDialog }}
        </template>
        <KemForm
                ref="form"
                :form-config="formConfig"
                :form-items="formItems"
                :data="form"
                :form-rules="formRuleComputeds"
                :read-only="readOnly"
                :alias="alias"
                :is-form-group="isFormGroup"
        >
            <template
                    v-for="(item) in formItems"
                    :slot="item.prop"
                    slot-scope="scope"
            >
                <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
            </template>
        </KemForm>
    </KemDialog>


</template>

<script>
//import { addOrModifyScence } from '@/api/index'

export default {
    name: "KemCrud",
    // args 存在缺陷不推荐使用
    // eslint-disable-next-line vue/require-prop-types
    props:['formConfig', 'formItems', 'formRules',  'alias', 'isFormGroup','args'],
    data() {
        return {
            headerDialog:'',
            currtenType:'当前操作类型',
            currtenDone:null,
            currtenRequest:null,
            defaultParams:null,
            visible:false,
            readOnly:false,
            form: {},

            mapDialogForm:{
                add:{
                    start:({title})=>{
                        this.headerDialog = title || '新增'



                    },

                },
                edit:{
                    start:({title,form})=>{
                        this.headerDialog = title || '修改'
                        if(!form){
                            throw new Error(`Need form !!!!!!! `)
                        }
                        this.form = form


                    },

                },
                detail:{
                    start:({title,form})=>{
                        this.headerDialog = title || '查看'
                        if(!form){
                            throw new Error(`Need form !!!!!!! `)
                        }
                        this.form = form
                        this.readOnly = true


                    },

                },
            }
        }
    },
    computed: {
        formRuleComputeds() {
            if(this.currtenType === 'add' || this.currtenType === 'edit'){
                return this.formRules;
            }else {
                return {}

            }

        }
    },

    watch: {
        // args 单项数据流是对 form 的补充
        args: {
            handler (value) {
                this.form={
                    ...this.form,
                    ...value,
                }
            },
            deep:true
        }
    },
    methods: {

        save(){
            const currtenDone = this.currtenDone
            const currtenRequest = this.currtenRequest
            const currtenType = this.currtenType

            if(currtenType === 'detail'){
                this.visible = false
                return
            }

            if(!currtenDone && typeof currtenDone !== 'function'){
                throw new Error(`Need !currtenDone && typeof currtenDone !== 'function' !!!!!!! `)
            }


            this.$refs['form'].validate().then(async valid => {
                if (valid) {

                    const res = await currtenRequest({
                        ...this.form,
                        ...this.defaultParams
                    })

                    if (currtenDone) currtenDone(res)
                    this.visible = false
                    this.form = {}
                    this.$emit('saveSuccess',res)
                } else {
                    return false;
                }
            })

        },
        async del(form){
            const currtenDone = this.currtenDone
            const currtenRequest = this.currtenRequest
            if(!form){
                throw new Error(`Need form !!!!!!! `)
            }
             if(!currtenDone && typeof currtenDone !== 'function'){
                throw new Error(`Need !currtenDone && typeof currtenDone !== 'function' !!!!!!! `)
            }

            const res = await currtenRequest({
                ...form,
                ...this.defaultParams
            })

            if (currtenDone) currtenDone(res)

            this.$emit('delSuccess',res)

        },
        start(value) {
            // eslint-disable-next-line no-unused-vars
            const   {type,form,request,done,defaultParams} = value

            this.readOnly = false

            if(!type){
                throw new Error(`Need type !!!!!!! `)
            }
            if(!request && typeof request !== 'function' && type !== 'detail'){
                throw new Error(`Need !request && typeof request !== 'function' !!!!!!! `)
            }
            this.currtenType = type
            this.currtenDone = done
            this.currtenRequest = request
            this.defaultParams = defaultParams || {}

            if(type === 'add' || type === 'edit' || type === 'detail'){
                this.form = {}
                this.visible = true
                this.$nextTick(()=>{

                    this.mapDialogForm[type].start(value)
                })
            }
            else if (type === 'del'){

                this.del(form)
            }




        }
    },

}
</script>

<style scoped>

</style>
