<template>
  <div class="kem-tag_group">
    <KemTag
      v-for="(item, index) in list"
      :key="index"
      :label="item.value"
      :disabled="item.disabled"
      style="margin-right: 8px; padding: 2px 10px !important"
      effect="plain"
      closable
      :class="isActive(item) ? 'is-active' : ''"
      @click="onClick(item)"
      @close="handleClose(item)"
    >
      {{ item.label }}111

      <!--        <div v-if="isActive(item)" class="triangle-bottomright" ></div>-->
      <!--        <div v-if="isActive(item)" class="dg-icon" >✓</div>-->
    </KemTag>

    <div class="kem-tag_group-append">
      <el-input
        v-if="inputVisible"
        ref="saveTagInput"
        v-model="inputValue"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else size="small" @click="showInput">+ {{ tagAppendText }}</el-button>
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
  components: {},
  mixins: [mixins],
  props: {
    /**
     * 追加标签按钮文字提示
     */
    tagAppendText: {
      type: String,
      default: '自定义',
    },
    /**
     * 追加标签的时候是否自动选择
     */
    tagAppendAutoSelect: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selected: [],
      inputVisible: false,
      inputValue: '',
    }
  },
  watch: {
    selected: {
      handler(value) {
        this.$emit('input', value)
      },
      deep: true,
    },
  },
  created() {
    this.selected = this.$attrs.value ?? []
  },

  methods: {
    handleClose(val) {
      debugger
    },
    rightShow(val) {
      console.log(val)
      debugger
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        if (this.selected.indexOf(inputValue) > -1) {
          this.$emit('tagAppendError', '不能重复添加')
          throw new Error(`不能重复添加!`)
        } else {
          if (this.tagAppendAutoSelect) {
            this.selected.push(inputValue)
          }
          this.$emit('tagAppend', inputValue)
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    onClick(item) {
      const value = item.value
      const index = this.selected.indexOf(value)
      if (index > -1) {
        this.selected.splice(index, 1)
      } else {
        this.selected.push(item.value)
      }
    },
    isActive(item) {
      const value = item.value
      const index = this.selected.indexOf(value)
      return index > -1
    },
  },
}
</script>
<style lang="scss">
.kem-tag_group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .is-active {
    border-width: 2px;
    border-color: #3964fd;
    box-sizing: border-box;
    //font-weight: bold;
  }
  .kem-tag {
    box-sizing: border-box;
    border-width: 2px;
    cursor: pointer;

    padding: 0 !important;
    height: auto;
    border-radius: 4px;
    .label_box {
      padding: 2px 14px;
      //height: 100%;
      width: 100%;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      .triangle-bottom {
        position: absolute;
        right: -1px;
        bottom: -1px;
        width: 0;
        height: 0;
        border-bottom: 15px solid #3964fd;
        border-left: 15px solid transparent;
      }
      .triangle-bottomright {
        position: absolute;

        display: inline-block;
        right: -1px;
        bottom: -1px;
        width: 0;
        height: 0;
        border-bottom: 15px solid #3964fd;
        border-left: 15px solid transparent;
      }
      .dg-icon {
        width: auto;
        display: inline-block;
        position: absolute;
        right: -1px;
        bottom: -3px;
        font-weight: bold;
        color: #ffffff;
        line-height: normal;
        font-size: 12px;
        transform: scale(0.7);
      }
      //  cursor: pointer;
    }
  }
  .kem-tag_group-append {
    display: inline-block;
    width: 100px;
    font-size: 12px;
    .el-input__inner {
      height: 28px;
      line-height: 28px;
    }
    .el-button {
      padding: 6px 12px;
    }
  }
}
</style>
