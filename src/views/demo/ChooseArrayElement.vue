<template>
<div style="text-align: left">
    <pre>{{ value }}</pre>
    <KemChooseArrayElement v-model="value.a" :form-items="formItems" button-text="自定义"/>
    <KemChooseArrayElement v-model="value.b" value-data-type="string" :form-items="formItems" />
</div>
</template>

<script>
 export default {
    name: "ChooseArrayElement",
    data() {
        return {
            value: {

            },
            formItems:[
                {label: '活动名称', prop: 'name', span:24, },
                {label: '电子邮箱', prop: 'email', span:24},
                {label: '人员总数', prop: 'num', span:24,component: 'KemInputNumber'},
            ]
        }
    },
}
</script>

<style scoped>

</style>
