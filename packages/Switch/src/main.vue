<template lang="pug">
    el-switch( v-bind="$attrs" v-on="evet")

</template>
<script>
/**
 * @displayName 开关
 */
export default {
    name: 'KemSwitch',

    computed:{
        evet(){
            return this.$listeners;
        },
    },
}
</script>

