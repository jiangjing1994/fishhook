<template>
    <div style="text-align: left">
        <KemSteps :title-list="titleList" :active="active"></KemSteps>
    </div>
</template>

<script>
export default {
    name: "Steps",
    data() {
        return {
            // 当前步骤条
            active:1,
        }
    },
    computed: {
        titleList() {
            return[
                {title:'基本信息',description:'sasa'},
                {title:'产品录入'},
                {title:'附件上传'},

            ]
        }

    },
}
</script>

<style scoped>

</style>
