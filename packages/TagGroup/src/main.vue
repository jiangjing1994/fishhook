<template>
  <div class="kem-tag_group">
    <div v-for="(item, index) in list" :key="index">
      <KemTag
        v-if="!renderContent"
        :label="item.value"
        :disabled="item.disabled"
        style="margin-right: 8px"
      >
        {{ item.label }}
        <div class="kem-tag__btn" @click="click(item)">
          <i class="el-icon-error"></i>
        </div>
      </KemTag>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <option-content :option="item" :selected="selected"></option-content>
        <!--        <div class="kem-tag__btn" @click="click(item)">-->
        <!--          <i class="el-icon-error"></i>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import mixins from '../../mixins/async_form_element'
/**
 * @displayName TagGroup 按钮组
 */
export default {
  name: 'KemTagGroup',
  components: {
    OptionContent: {
      props: {
        option: Object,
        selected: Boolean,
        click: Function,
      },
      render(h) {
        const getParent = (vm) => {
          if (vm.$options.componentName === 'ElTransferPanel') {
            return vm
          } else if (vm.$parent) {
            return getParent(vm.$parent)
          } else {
            return vm
          }
        }
        const panel = getParent(this)
        this.option['selected'] = this.selected
        return panel.renderContent(h, this.option, this.$parent.click)
      },
    },
  },
  mixins: [mixins],
  props: {
    renderContent: Function,
    selected: Boolean,
  },
  data() {
    return {}
  },

  methods: {
    click(value) {
      this.$emit('click', value)
    },
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
