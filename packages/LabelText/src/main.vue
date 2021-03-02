<template>
    <span style="padding: 0 8px;font-size: 0.95em">
        {{ value }}
    </span>
</template>
<script>
/**
 * @displayName 文本文字
 */
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
