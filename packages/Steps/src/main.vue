<template lang="pug">
    .steps_body
        el-steps( :active="active"  style="margin-bottom:20px" finish-status="success" :space="180" :direction="direction")
            el-step(:title="item.title" v-for="(item,key) in titleListComputed" :key="key" :description="active < key+1 ? '正在进行'+item.title: item.title+'已完成'" )
</template>
<script>
import { filter } from '../../utils'
/**
 * @displayName Steps 步骤条
 */
export default {
    name: 'KemSteps',

    props: {
        titleList: {
            type: Array,
            default: ()=>{
                return [

                ]
            }
        },
        active: {
            type: Number,
            default: 0
        },
        space: {
            type: Number,
            default: 180
        },
        direction: {
            type: String,
            default: 'horizontal'
        }
    },

    data() {
        return {}
    },

    computed: {
        titleListComputed() {

            return filter(this.titleList,o =>{
                return !o.hidden;
            });

        }
    }

}
</script>

<style scoped>
.steps_body{
    padding: 0 30px;
}
</style>
