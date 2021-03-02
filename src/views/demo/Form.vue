<template>
    <div style="text-align: left;display: flex;justify-content: center">
        <KemPageCard style="width: 800px;margin-right: 20px" header="Form">
            <pre>{{ form }}</pre>

             <div slot="footer">
                <KemButton @click="updataFormItems">切换FormItems</KemButton>
                <KemButton @click="readOnly=!readOnly">只读</KemButton>
                <KemButton @click="submitForm">提交</KemButton>
            </div>

        </KemPageCard>


        <KemPageCard style="width: 800px" header="Form">
            <pre>{{ form }}</pre>

            <KemForm
                    ref="form"
                    :form-items="formItems2"
                    :form-config="{labelPosition:'right',labelWidth:'120px'}"
                    :data="form"
                    :form-rules="formRules"
                    :read-only="readOnly"
                    is-form-group
                    @updataFormData="updataFormData"
            >
                <template slot="resource">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </template>

            </KemForm>
            <div slot="footer">
                <KemButton @click="updataFormItems">切换FormItems</KemButton>
                <KemButton @click="readOnly=!readOnly">只读</KemButton>
                <KemButton @click="submitForm">提交</KemButton>
            </div>

        </KemPageCard>

    </div>
</template>

<script>
export default {
    name: "Form",
    data() {
        return {
            form:{
            },
            readOnly:false,
            formRules:{
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'change' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['change'] }
                ]
            },
            formItems: [
                {label: '活动名称', prop: 'name', span:24, tip:'sasa'},
                {label: '电子邮箱', prop: 'email', span:24},
                {label: '人员总数', prop: 'num', span:24,component: 'KemInputNumber'},
                {label: '活动区域', prop: 'region', span:24, component: 'KemSelect',props:{
                        options:[
                            {
                                label:'区域一',
                                value:'shanghai'
                            },
                            {
                                label:'区域二',
                                value:'beijing'
                            }
                        ]
                    } },
                {label: '二级区域', prop: 'region2', span:24, component: 'KemSelect',
                    showIf: (data) => {
                        return !!data.region
                    },
                    props: (data) => {
                        let options = []
                        if (data.region === 'shanghai'){
                            options = [
                                {
                                    label:'shanghai_0001',
                                    value:'shanghai_0001'
                                },
                                {
                                    label:'shanghai_0002',
                                    value:'shanghai_0002'
                                },
                            ]
                        }
                        return {
                            multiple:true,
                            options
                        }
                    },
                },
                {label: '即时配送', prop: 'delivery', span:24, component: 'KemSwitch',},
                {label: '活动性质', prop: 'type', span:24, component: 'KemCheckboxGroup',props:{
                        options:[
                            {
                                label:'美食/餐厅线上活动',
                                value:'shanghai'
                            },
                            {
                                label:'地推活动',
                                value:'beijing'
                            }
                        ]
                    } },
                {label: '特殊资源', prop: 'resource', slot: 'resource', span:24},
            ],
            formItems2: [
                {

                    label:'表单组1',
                    formItems:[
                        {label: '活动名称', prop: 'name', span:24, tip:'afsdfdfsdfsd',tipType:'alert'},
                        {label: '电子邮箱', prop: 'email', span:24},
                        {label: '人员总数', prop: 'num', span:24,component: 'KemInputNumber'},
                        {label: '活动区域', prop: 'region', span:24, component: 'KemSelect',props:{
                                options:[
                                    {
                                        label:'区域一',
                                        value:'shanghai'
                                    },
                                    {
                                        label:'区域二',
                                        value:'beijing'
                                    }
                                ]
                            } },
                    ]
                },
                {

                    label:'表单组2',
                    formItems:[
                        {label: '二级区域', prop: 'region2', span:24, component: 'KemSelect',
                            showIf: (data) => {
                            console.log('e33')
                                return !data.region
                            },
                            props: (data) => {
                                let options = []
                                if (data.region === 'shanghai'){
                                    options = [
                                        {
                                            label:'shanghai_0001',
                                            value:'shanghai_0001'
                                        },
                                        {
                                            label:'shanghai_0002',
                                            value:'shanghai_0002'
                                        },
                                    ]
                                }
                                return {
                                    multiple:true,
                                    options
                                }
                            },
                        },
                        {label: '即时配送', prop: 'delivery', span:24, component: 'KemSwitch',},
                        {label: '活动性质', prop: 'type', span:24, component: 'KemCheckboxGroup',props:{
                                options:[
                                    {
                                        label:'美食/餐厅线上活动',
                                        value:'shanghai'
                                    },
                                    {
                                        label:'地推活动',
                                        value:'beijing'
                                    }
                                ]
                            } },
                        {label: '特殊资源', prop: 'resource', slot: 'resource', span:24},
                    ]
                },


            ]
        }
    },
    methods: {
        submitForm() {
            this.$refs['form'].validate().then(valid=>{
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        updataFormData(newvalue,oldvalue) {
            if(newvalue.name !== oldvalue.name){
                this.$message.success('活动名称变了')
            }


        },
        updataFormItems(){
            this.formItems = [
                {label: '活动名称', prop: 'name', span:24,},
            ]
        }

    },

};
</script>

<style scoped></style>
