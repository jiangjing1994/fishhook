<template lang="pug">
    el-date-picker( v-bind="$attrs" :value-format="valueFormat"    v-on="evet"  align="right" :default-value="defaultValue" :type="type"  style='width:100%' :placeholder="placeholder" )
</template>
<script>
/**
 * @displayName 日期选择器
 */
export default {
    name: 'KemDatePicker',
    props: {
        placeholder: {
            type: String,
            default: '选择日期'
        },
        /** 选择器类型
         * @values date, datetime, time
         */
        type: {
            type: String,
            default: 'date'
        },
        valueFormat: {
            type: String,
            default: 'yyyy-MM-dd'
        },
    },
    data() {
        return {
            defaultValue: new Date(),
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            value1: '',
            value2: '',
        };
    },
    computed:{
        evet(){
            return this.$listeners;
        },
    },
}
</script>

<style scoped>

</style>
