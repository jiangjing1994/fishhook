<template>
    <el-form
            ref="form"
            class="form_body--card"
            style="position: relative"
            v-bind="computedConfig"
            :rules="formRules||rules"
            :model="data"
    >
        <div v-if="readOnly" class="mask" />
        <div v-if="readOnly" style="text-align: right;padding: 10px">
            <el-tag type="danger">
                只读
            </el-tag>
        </div>
        <el-row>
            <el-col
                    v-for="(item, index) in computedItems"
                    :key="getItemKey(item, index)"
                    :md="item.md"
                    :sm="item.sm"
                    :span="item.span || 12"
            >
                <div
                        v-if="item.type === 'group'"
                        class="form-group__header"
                >
                    {{ item.label }}
                </div>
                <el-form-item
                        v-else
                        :label="item.label + ':'"
                        :prop="item.prop"
                >
                    <render-content
                            v-if="item.labelRender"
                            slot="label"
                            :render="item.labelRender"
                            :data="item"
                    />
                    <slot
                            :name="item.slot"
                            v-bind="{ item }"
                    >
                        <component
                                :is="item.component"
                                v-if="item.component !== 'Text'"
                                :ref="item.ref || `cp-${item.prop}`"
                                v-model="data[item.prop]"
                                :data="data"
                                v-bind="item.props"
                                v-on="item.listeners"
                        />
                        <span v-else>{{ data[item.prop] }}</span>
                    </slot>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>


<script lang="jsx">

import { cloneDeep,debounce } from 'lodash'
const defaultConfig = {
    labelWidth: '120px',
 }
// 表单字段格式化
const RenderContent = {
    props: {
        render: Function,
        formatter: Function, // 格式化数据
        data: Object,
        prop: String
    },
    render (h) {
        if (this.render) {
            return this.render(h, this.data)
        }
        let value = this.data[this.prop]
        if (this.formatter) {
            value = this.formatter(value, this.data)
        }
        return <span>{value}</span>
    }
}
// element UI 组件
let defaultaAlias = {
    LabelText: {
        component: 'render-content',
        props: {}
    },
    Input: {
        component: 'Input',
        props: {}
    },
    DictSelect: {
        component: 'DictSelect',
        props: {}
    },

    InputTextarea: {
        component: 'InputTextarea',
        props: {}
    },


    DatePicker: {
        component: 'DatePicker',
        props: {}
    },

    SelectTree: {
        component: 'SelectTree',
        props: {}
    },
    SelectTreeServe: {
        component: 'SelectTreeServe',
        props: {}
    },

    SelectTreeOrg: {
        component: 'SelectTreeOrg',
        props: {}
    },

    SelectService: {
        component: 'SelectService',
        props: {}
    },

    Checkbox: {
        component: 'Checkbox',
        props: {}
    },

    BaseEditor: {
        component: 'BaseEditor',
        props: {}
    },


    Number: {
        component: 'el-input-number',
        props: {}
    },

    Radio: {
        component: 'el-radio',
        props: {}
    },

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

export default {
    name:'KemForm',
    components: {
        RenderContent
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
        group: Array,
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
        computedItems () {
            const itemResult = []

            let alias = {...defaultaAlias,...this.alias}

            for (const item of this.formItems) {
                // 剩余参数语法允许我们将一个不定数量的参数表示为一个数组。theArgs
                let { component = 'KemInput', showIf, prop, props, ...theArgs } = item
                if (typeof showIf === 'function' && !showIf(this.data)) {
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
                    props,
                    ...theArgs
                })
            }
            return itemResult
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

        computedFormItems() {
            const formItems = cloneDeep(this.formItems)
            return JSON.stringify(formItems)
        }
    },

    watch: {

        computedFormData:{
            handler(newValue,oldValue) {

                this.updataFormDataDebounce({ vm: this, newValue, oldValue})
            },
            deep: false
        },

        computedFormItems:{
            handler(newValue,oldValue) {
                console.log(newValue)
                console.log(oldValue)
            },
            deep: false
        },
    },
    created(){
     },
    methods: {
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
        //cursor: not-allowed;
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
}


</style>

