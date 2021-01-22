<template>
    <!--ScenceInfo 场景信息-->
    <KemDialog v-if="visible" :visible.sync="visible" @save="save"  >
        <template slot="header">
            {{ headerDialog }}
        </template>
        <KemForm
                ref="form"
                :form-config="formConfig"
                :form-items="formItems"
                :data="form"
                :form-rules="formRules"
                :read-only="readOnly"
                :alias="alias"
                :is-form-group="isFormGroup"
        >
        </KemForm>
    </KemDialog>


</template>

<script>
//import { addOrModifyScence } from '@/api/index'

export default {
    name: "KemCrud",
    // eslint-disable-next-line vue/require-prop-types
    props:['formConfig', 'formItems', 'formRules',  'alias', 'isFormGroup',],
    data() {
        return {
            headerDialog:'',
            currtenType:'当前操作类型',
            currtenDone:null,
            currtenRequest:null,
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

                    const res = await currtenRequest(this.form)

                    if (currtenDone) currtenDone(res)
                    this.visible = false
                    this.form = {}
                    this.$emit('saveSuccess',res)
                } else {
                    return false;
                }
            })

        },
        async del(){
            const currtenDone = this.currtenDone
            const currtenRequest = this.currtenRequest

            if(!currtenDone && typeof currtenDone !== 'function'){
                throw new Error(`Need !currtenDone && typeof currtenDone !== 'function' !!!!!!! `)
            }

            const res = await currtenRequest(this.form)

            if (currtenDone) currtenDone(res)

            this.$emit('delSuccess',res)

        },
        start(value) {
            // eslint-disable-next-line no-unused-vars
            const   {type,form,request,done} = value


            if(!type){
                throw new Error(`Need type !!!!!!! `)
            }
            if(!request && typeof request !== 'function' && type !== 'detail'){
                throw new Error(`Need !request && typeof request !== 'function' !!!!!!! `)
            }
            this.currtenType = type
            this.currtenDone = done
            this.currtenRequest = request

            if(type === 'add' || type === 'edit' || type === 'detail'){
                this.form = {}
                this.visible = true
                this.$nextTick(()=>{

                    this.mapDialogForm[type].start(value)
                })
            }
            else if (type === 'del'){
                this.del()
            }




        }
    },

}
</script>

<style scoped>

</style>
