<template>
    <el-form
            ref="form"
            v-bind="computedConfig"
            :rules="rules"
            :model="data"
    >
        <el-row :gutter="20">
            <el-col
                    v-for="(item, index) in computedItems"
                    :key="getItemKey(item, index)"
                    :md="item.md"
                    :sm="item.sm"
                    :span="item.span || 8"
            >
                <el-form-item
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

<!--
                        <render-content2 :column="item"  :data="data" :render="item.componentRender" :index="index"></render-content2>
-->

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
const defaultConfig = {
    labelWidth: '80px',
    size:'small',
}


 // element UI 组件
const alias = {
    label: {
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







    input: {
        component: 'el-input',
        props: {}
    },
    textarea: {
        component: 'el-input',
        props: {
            type: 'textarea'
        }
    },
    radio: {
        component: 'el-radio',
        props: {}
    },

    select: {
        component: 'el-select',
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
    name:'FormCard',
    components: {
        RenderContent:{
            props: {
                render: Function,
                data: Object,
                prop: String,
                formatter: Function, // 格式化数据

            },
            render (v) {

                if (this.render) {
                    return this.render(h, this.data)
                }
                let value = this.data[this.prop]

                return <span>{value}</span>
            }
        },
        RenderContent2:{
            functional: true,
            props: {
                row: Object,
                data: Object,
                render: Function,
                index: Number,
                column: {
                    type: Object,
                    default: null
                }
            },
            render: (h, ctx) => {
                const params = {
                    row: ctx.props.row,
                    index: ctx.props.index,
                    value:ctx.props.data[ctx.props.column.prop]
                   // value:ctx.props.column.data[ctx.props.column.prop]
                }
                if (ctx.props.column) params.column = ctx.props.column
                return ctx.props.render(h, params)
            }
        },
    },

    props: {
        // eslint-disable-next-line vue/require-default-prop
        formConfig: {
            type: Object,
            default: ()=>{
                return{
                    labelWidth: '120px'

                }
            }
        },
        // eslint-disable-next-line vue/require-default-prop
        formItems: Array,
        // eslint-disable-next-line vue/require-default-prop
        data: Object,
    },
    computed: {
        computedConfig () {
            return {
                ...defaultConfig,
                ...this.formConfig
            }
        },
        computedItems () {
            const itemResult = []
            for (const item of this.formItems) {
                // 剩余参数语法允许我们将一个不定数量的参数表示为一个数组。theArgs
                let { component = 'input', isShow, prop, props, ...theArgs } = item
                if (typeof isShow === 'function' && !isShow(this.data)) {
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
                // if (alias[component]) {
                //     props = {
                //         ...alias[component].props,
                //         ...props
                //     }
                //     component = alias[component].component
                // }



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
        }
    },

    watch: {
        data:{
            handler(newValue,oldValue) {


                this.$emit('updataFormData',newValue,oldValue)
            },
            deep: true
        },
    },
    methods: {
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

