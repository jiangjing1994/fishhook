<template lang="pug">
    el-slider( v-bind="$attrs" v-on="evet" :showInput="showInput" :range="range" :max="max" :min="min" style="padding:0 10px")

</template>
<script>
/**
 * @displayName InputSlider 滑块
 */
export default {
    name: 'KemInputSlider',
    props: {
        showInput: {
            type: Boolean,
            default:false
        },
        range: {
            type: Boolean,
            default:true
        },
        max: {
            type: Number,
            default:100
        },
        min: {
            type: Number,
            default:0
        },
    },
    computed:{
        evet(){
            return this.$listeners;
        },
    },
}
</script>

