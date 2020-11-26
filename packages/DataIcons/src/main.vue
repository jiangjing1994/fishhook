<template>
    <div class="data-icons_body" :style="`background-color:${backgroundColor};padding: ${gutter}px;padding-bottom: 0;`">
        <el-row :gutter="gutter">
            <template v-for="(item,index) in data">
                <el-col :key="index"
                        :span="span"
                >
                    <div class="item" :style="`background-color:${itemBackgroundColor};margin-bottom: ${gutter}px;`"
                         :class="[{'item--easy':discount}]"
                    >
                        <a :href="item.href?item.href:'javascript:void(0);'"
                           :target="item.target"
                           @click="item.click?item.click(item):''"
                        >
                            <div class="item-icon"
                                 :style="{color:item.color||color}"
                            >
                                <i :class="item.icon"></i>
                            </div>
                            <div class="item-info">
                                <span :style="{color:item.titleColor||titleColor}">{{ item.title }}</span>
                                <span>
                                   <KemCountUp :animation="animation"
                                               :decimals="decimals"
                                               :style="{color:item.color||color}"
                                               class="count"
                                               :value="item.count"
                                   ></KemCountUp>
                                <span style="font-size: 14px" :style="{color:item.titleColor||titleColor}"> {{ item.append }}</span>
                                </span>

                            </div>
                        </a>
                    </div>
                </el-col>
            </template>
        </el-row>
    </div>
</template>

<script>
export default  {
    name: "KemDataIcons",
    props: {
        option: {
            type: Object,
            default: () => { }
        },
    },
    data () {
        return {};
    },
    computed: {
        backgroundColor(){
            return this.option.backgroundColor || '#e5ffff'
        },
        gutter(){
            return this.option.gutter || 10
        },
        itemBackgroundColor(){
            return this.option.itemBackgroundColor || '#4ffbfa'
        },
        animation () {
            return this.option.animation
        },
        decimals () {
            return this.option.decimals || 0
        },
        span () {
            return this.option.span || 4;
        },
        data () {
            return this.option.data;
        },
        color () {
            return this.option.color || "#3FA1FF";
        },
        titleColor () {
            return this.option.titleColor || "#333333";
        },
        discount () {
            return this.option.discount || false;
        }
    }
}
</script>
<style lang="scss">
.data-icons_body {
    background-color: #e5ffff;
     .item {
        display: flex;
        align-items: center;
        justify-content: center;
        /*width: 90%;
        margin: 0 auto;
        margin: 10px 15px;*/
         background-color: #e5ffff;
    }
    .item-icon {
        margin-top: 3px;
        margin-right: 0 !important;
        text-align: center;
        &>i {
            font-size: 46px !important;
        }
    }
    .item-info {
        text-align: center;
        padding: 10px 0;
        &>span {
            display: block;
            padding: 5px 0;
            color: #999;
            font-size: 12px;
        }
        .count {
            font-size: 20px;
            line-height: 25px;
        }
    }
    .item--easy {
        flex-direction: column;
        &>.item-icon {
            margin: 0;
        }
        &>.item-info {
            margin-top: -15px;
            &>span {
                font-size: 14px;
            }
        }
    }
}
</style>
