<template>
    <KemInput
              type="password"
              v-bind="$attrs"
              :prefix-icon="prefixIcon "
              :placeholder="placeholder"
              show-password
              :autocomplete="autocomplete"
              v-on="evet"
></KemInput>


</template>
<script>
/**
 * @displayName 密码输入框
 */
export default {
    name: 'KemInputPassWord',
    props: {
        placeholder: {
            type: String,
            default: '请输入密码'
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        prefixIcon: {
            type: String,
            default: 'el-icon-unlock'
        },

    },
    computed:{
        evet(){
            return this.$listeners;
        },
        label(){
            return this.$attrs.value;
        },
    },
}
</script>

