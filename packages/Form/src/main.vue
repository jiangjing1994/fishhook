<template>
    <el-form
            v-if="reload"
            ref="form"
            class="form_body--card"
            style="position: relative"
            v-bind="computedConfig"
            :rules="formRules||rules"
            :model="data"
    >
        <div v-if="readOnly" class="mask"></div>
        <!--<div v-if="readOnly" style="text-align: right">
            <el-tag type="danger">
                只读
            </el-tag>
        </div>-->

        <FormItem
                :computed-items="computedItems"
                :data="data"
                :is-form-group="isFormGroup"
        ></FormItem>
<!--        <el-timeline v-else :reverse="false">-->
<!--            <el-timeline-item v-for="(timelineItem, key) in computedItems" :key="key">-->
<!--                <template slot="dot">-->
<!--                    <div class="icon__body">-->
<!--                        <i :class="`${timelineItem.icon || 'el-icon-paperclip'}`"></i>-->
<!--                    </div>-->
<!--                </template>-->
<!--                <div class="timeline__title">{{ timelineItem.label }}</div>-->
<!--                <FormItem-->
<!--                        :computed-items="timelineItem.formItems"-->
<!--                        :data="data"-->
<!--                ></FormItem>-->
<!--            </el-timeline-item>-->
<!--        </el-timeline>-->
    </el-form>
</template>


<script lang="jsx">

import { cloneDeep,debounce } from 'lodash'
const defaultConfig = {
    labelWidth: '100px',
}

// element UI 组件
let defaultaAlias = {
    datePicker: {
        component: 'el-date-picker',
        props: {
            style: {
                width: '100%'
            },
            "value-format": 'timestamp'
        }
    }
}

import FormItem from './FormItem'
/**
 * @displayName Form 配置化表单
 */
export default {
    name:'KemForm',
    components: {
        FormItem
    },

    props: {
        // eslint-disable-next-line vue/require-default-prop
        formConfig: {
            type: Object,
            default: ()=>{
                return{
                    labelWidth: '120px',


                }
            }
        },
        // eslint-disable-next-line vue/require-default-prop
        formItems: Array,

        // eslint-disable-next-line vue/require-default-prop
        data: Object,
        // eslint-disable-next-line vue/require-default-prop
        formRules: Object,
        readOnly:{
            type:Boolean,
            default:false
        },
        alias:{
            type: Object,
            default: ()=>{
                return{}
            }
        },

        isFormGroup:{
            type: Boolean,
            default:false
        }
    },
    data() {
        return {
            computedItems: [],
            reload: false
        }
    },
    computed: {
        computedConfig () {
            return {
                size:this.$MIMI.formSize,
                ...defaultConfig,
                ...this.formConfig
            }
        },
        rules () {
            let rules = this.computedItems.reduce((total, item) => {
                if (item.rules) {
                    let rules = item.rules
                    if (typeof rules === 'function') {
                        rules = rules(this.data)
                    }
                    total[item.prop] = rules
                }
                return total
            }, {})
            return rules
        },
        computedFormData() {
            const data = cloneDeep(this.data)
            return JSON.stringify(data)
        },

        initialFormItems(){
            const isFormGroup = this.isFormGroup
            if(!isFormGroup){
                return  this.formItems
            }
            else {
                let  newFormItems = []
                for (let item of this.formItems) {
                    newFormItems.push({
                        ...item,
                        isFormGroup:true
                    })
                    newFormItems = [...newFormItems,...item.formItems]
                }
                return newFormItems
             }

        },

        computedFormItems() {
            const initialFormItems = cloneDeep(this.initialFormItems)
            return JSON.stringify(initialFormItems)
        }
    },

    watch: {

        data:{
            handler() {
                this.getComputedItems()
            },
            deep: true,
            immediate:false
        },

        computedFormData:{
            handler(newValue,oldValue) {

                this.updataFormDataDebounce({ vm: this, newValue, oldValue})
            },
            deep: false
        },

        computedFormItems:{
            handler( ) {
                //console.log(newValue)
                // console.log(oldValue)
            },
            deep: false
        },
    },
    created(){
        this.getComputedItems()
    },
    methods: {
        getComputedItems(){

            this.reload = false
            const getci = () =>{
                let alias = {...defaultaAlias,...this.alias}

                const initialFormItems = this.initialFormItems


                const createitemFun = (initialFormItems) =>{
                    const itemResult = []

                    for (const item of initialFormItems) {
                        // 剩余参数语法允许我们将一个不定数量的参数表示为一个数组。theArgs
                        let { component = 'KemInput', showIf, prop, props, ...theArgs } = item

                        let isShow = true
                        if (typeof showIf === 'function' && !showIf(this.data)) {
                             isShow = false
                            continue
                        }
                        if (typeof props === 'function') {
                            props = props(this.data)
                        }
                        if (component === 'label') {
                            props = {
                                ...props,
                                data: this.data,
                                prop
                            }
                        }
                        if (alias[component]) {
                            props = {
                                ...alias[component].props,
                                ...props
                            }
                            component = alias[component].component
                        }
                        itemResult.push({
                            component,
                            prop,
                            isShow,
                            showIf,
                            props,
                            ...theArgs
                        })
                    }

                    return itemResult
                }


                return createitemFun(initialFormItems)
                // eslint-disable-next-line no-unreachable

            }


            this.computedItems = getci()



            this.reload = true

        },
        updataFormDataDebounce: debounce(({ vm, newValue, oldValue }) => {

            vm.$emit('updataFormData',JSON.parse(newValue),JSON.parse(oldValue))

        }, 500),
        getItemKey (item, index) {
            return `${item.prop}-${index}`
        },
        validate () {
            return new Promise(resolve => {
                this.$refs.form.validate(resolve)
            })
        },
        clearValidate (props) { // 清空校验
            this.$refs.form.clearValidate(props)
        }
    }
}
</script>
<style lang="scss">
.form_body--card{
    .mask{
        z-index: 2;
        position: absolute;
        width: 100%;
        height: 100%;
        cursor: not-allowed;
    }
    .form-group__header{
        width: 100%;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
    }


    .el-form-item__label{
        font-weight: bold;
        font-size: 12px;
        padding: 0 2px 0 0;
    }
}


</style>

