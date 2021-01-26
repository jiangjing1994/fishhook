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
