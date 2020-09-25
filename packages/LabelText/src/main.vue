<template lang="pug">
    span {{value}}
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
