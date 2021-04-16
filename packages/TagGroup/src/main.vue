<template>
    <div class="kem-tag_group ">
        <KemTag
                v-for="(item,index) in list "
                :key="index"
                style="margin-right: 8px"
                :label="item.value"
                :disabled="item.disabled"


        >
            {{ item.label }}
            <div class="kem-tag__btn" @click="click(item)">
                <slot/>
                <i v-if="!$slots.default" class="el-icon-error"></i>
            </div>
        </KemTag>
    </div>

</template>
<script>
    import mixins from "../../mixins/async_form_element";
    /**
     * @displayName TagGroup 按钮组
     */
    export default {
        name: 'KemTagGroup',
        mixins: [mixins],
        props: {},
        data() {
            return {}
        },

        methods: {
            click(value) {
                this.$emit('click',value)

            }
        },

    }
</script>
<style lang="scss">
    .kem-tag_group {
        .kem-tag {
            box-sizing: border-box;
            width: 100%;
            margin-bottom: 10px;
            height: 36px;
            line-height: 36px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 15px;
            .kem-tag__btn {
                cursor: pointer;
                margin: 0 5px;
                display: none;
                width: 25px;
                height: 25px;
                text-align: center;
                line-height: 25px;
                /*border-radius: 10px;*/
                /*border: 1px solid #eeeeee;*/
                /*background-color: #ffffff;*/
                font-size: 18px;


            }
            &:hover {
                .kem-tag__btn {
                    display: block;


                }

                & {

                }
            }


        }
    }
</style>

