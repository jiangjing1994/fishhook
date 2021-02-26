<template>
    <div>
        <pre>{{value}}</pre>
        <KemDatePicker v-model="value"></KemDatePicker>
    </div>

</template>

<script>
export default {
    name: "DatePicker",
    data() {
        return {
            value: ''
        }
    },
}
</script>

<style scoped>

</style>
