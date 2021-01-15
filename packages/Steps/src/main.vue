<template lang="pug">
    .steps_body
        el-steps( :active="active-1"  style="margin-bottom:20px" finish-status="success")
            el-step(:title="item.title" v-for="(item,key) in titleListComputed" :key="key") {{item.description}}
</template>
<script>
import { filter } from 'lodash'
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
