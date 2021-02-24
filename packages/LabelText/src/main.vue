<template>
    <span style="padding-left: 16px;font-size: 0.95em">
        {{ value }}
    </span>
</template>
<script>
export default {
    name: 'KemLabelText',

    props: {
        value: {
            type: String,
            default: ''
        }
    },
    watch: {
        value(newValue) {
            this.$emit('input', newValue)
        }
    },

    methods: {
    },
}
</script>

<style scoped>

</style>
