<template>
    <div style="text-align: left">
        <KemSteps :title-list="titleList" :active="active"></KemSteps>
        <el-steps direction="vertical" :space="80" :active="active" finish-status="success">
            <el-step title="步骤 1" :description="active < 1 ? '正在进行步骤一' : '步骤一已完成'"></el-step>
            <el-step title="步骤 2" :description="active < 2 ? '正在进行步骤二' : '步骤二已完成'"></el-step>
            <el-step title="步骤 3" :description="active < 3 ? '正在进行步骤三' : '步骤三已完成'"></el-step>
            <el-step title="步骤 4" :description="active < 4 ? '正在进行步骤四' : '步骤四已完成'"></el-step>
            <el-step title="步骤 5" :description="active < 5 ? '正在进行步骤五' : '步骤五已完成'"></el-step>
            <el-step title="步骤 6" :description="active < 6 ? '正在进行步骤六' : '步骤六已完成'"></el-step>
        </el-steps>
    </div>
</template>

<script>
export default {
    name: "Steps",
    data() {
        return {
            // 当前步骤条
            active:0,
        }
    },
    computed: {
        titleList() {
            return[
                {title:'步骤 1'},
                {title:'步骤 2'},
                {title:'步骤 3'},
                {title:'步骤 4'},
                {title:'步骤 5'},
                {title:'步骤 6'},
                {title:'步骤 7'},

            ]
        }

    },
}
</script>

<style scoped>

</style>
