<template>
    <el-row class="fomr_item_body">
        <el-col
                v-for="(item, index) in computedItems"
                :key="getItemKey(item, index)"
                :md="item.md"
                :sm="item.sm"
                :span="getItemSpan(item)"
        >
            <template v-if="!item.isFormGroup">
                <div :class="isFormGroup?'isformgrouptitle':''">
                    <div v-if="item.tip && item.tipType === 'alert'" style="padding: 0 0 0 10px;margin-bottom: 5px">
                        <el-alert
                                :title=" item.tip"
                                style="padding: 5px 6px"
                                type="info"
                                show-icon
                                :closable="false"
                        >
                        </el-alert>
                    </div>
                    <el-form-item
                            :prop="item.prop"
                    >
                        <render-content
                                v-if="item.labelRender"
                                slot="label"
                                :render="item.labelRender"
                                :data="item"
                        />
                        <span v-else slot="label">
                       {{ item.label }}
                        <el-tooltip v-if="item.tip && item.tipType !== 'alert'" effect="dark" placement="bottom">
                            <template slot="content"><pre>{{ item.tip }}</pre></template>
                        <i class="el-icon el-icon-info" style="cursor: pointer"></i> :
                        </el-tooltip>：
                    </span>
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
                </div>

            </template>
            <template v-else>
                <div class="fib-title_body">
                    <div class="fib-icon__body">
                        <i :class="`${item.icon || 'el-icon-paperclip'}`"></i>

                    </div>
                    <div class="fib-label__body">{{ item.label }}</div>
                </div>


            </template>

        </el-col>
        <div v-if="isFormGroup" class="line-vertical"></div>
    </el-row>
</template>

<script lang="jsx">

export default {
    name: "FormItem",
    components:{
        // 表单字段格式化

        RenderContent:{
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
    },
    props: {
        isFormGroup:Boolean,
        computedItems: {
            type: Array,
            default: ()=>{
                return []
            }
        },
        data:{
            type: Object,
            default: ()=>{
                return {}
            }
        }
    },
    methods: {
        getItemKey (item, index) {
            return `${item.prop}-${index}`
        },
        getItemSpan (item) {
            return item.span || (item.isFormGroup ? 24 : 12)
        },
    },
}
</script>

<style   lang="scss">
.fomr_item_body{
    position: relative;
    .line-vertical{
        position: absolute;
        height: 100%;
        width: 1px;
        border-left: 2px #eeeeee solid;
        left: 20px;
        margin-top: 5px;


    }
    .isformgrouptitle{
        padding-left: 30px;
    }
    .fib-title_body{
        height: 32px;
        line-height: 32px;
        padding-left: 5px;
        margin-bottom: 10px;
      //  background-image: linear-gradient(to right, #e3f5ff, #ffffff);
        border-radius: 5px;
        position: relative;
        .fib-icon__body{
            position: absolute;
            z-index: 10;
            width: 32px;
            height: 32px;
            line-height: 32px;
             font-size:16px;
            font-weight: bold;
            color: #4251eb;
            border-radius: 15px;
            background-color: #e3f5ff;
            text-align: center;
        }
        .fib-label__body{
            position: absolute;
            font-size:14px;
            font-weight: bold;
            left: 40px;
        }
    }

}

</style>
