<template>

    <KemPageCard header="下拉Select">
        <pre>{{ form }}</pre>
         <KemForm
                ref="form"
                :form-items="formItems"
                :data="form"
        >
        </KemForm>
        <template slot="footer">
            <KemButton @click="dianwo">切换uiType</KemButton>
        </template>


    </KemPageCard>
</template>

<script>
const transferRequest=()=> {
    return new Promise((resolve) => {

        setTimeout(() => {
            resolve([
                {transferName: '动态数据1', id: 'Beijing'},
                {transferName: '动态数据2', id: 'Shanghai'},
                {transferName: '动态数据3', id: 'Nanjing'},
                {transferName: '动态数据4', id: 'Chengdu'},
                {transferName: '动态数据5', id: 'Shenzhen'},
                {transferName: '动态数据6', id: 'Guangzhou'},
            ])
        }, 500)

    })
}
export default {
    name: "Select",
    data() {
        return {

            uiType:'text',
            form: {
                prop3:'Nanjing',
                prop4:'这是KemInput'
            }
        }
    },
    computed: {
        formItems() {
            const uiType = this.uiType
            return [
                {
                    label: '静态条件', prop: 'prop1', span: 13, component: 'KemSelect', props: {
                        options: [
                            {
                                label: '区域一',
                                value: 'shanghai'
                            },
                            {
                                label: '区域二',
                                value: 'beijing'
                            }
                        ]
                    }
                },
                {
                    label: '动态条件', prop: 'prop2', span: 13, component: 'KemSelect', props: {
                        request: transferRequest,
                        defaultProps: {
                            label: 'transferName',
                            value: 'id'
                        },
                        defaultParams: {
                            dictType: 'transfer'
                        },

                    }
                },
                {
                    label: '文字模式', prop: 'prop3', span: 13, component: 'KemSelect', props: {
                        request: transferRequest,
                        defaultProps: {
                            label: 'transferName',
                            value: 'id'
                        },
                        defaultParams: {
                            dictType: 'transfer'
                        },
                        uiType
                    }
                },
                {
                    label: '文字模式2', prop: 'prop4', span: 13, props: {
                        uiType
                    }
                },
             ]
        }
    },
    methods: {
        dianwo() {
            if (this.uiType === ''){
                this.uiType ='text'
            }else {
                this.uiType = ''
            }

        }
    },
}
</script>

<style scoped>

</style>
