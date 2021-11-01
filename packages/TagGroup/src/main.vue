<template>
  <div class="kem-tag_group">
    <div v-for="(item, index) in list" :key="index" class="kem-tag_group-box">
      <div v-if="item.isInput && editValue" class="kem-tag_group-eidt">
        <el-input
          ref="editTagInput"
          v-model="editValue"
          size="mini"
          @keyup.enter.native="handleTagEditConfirm"
          @blur="handleTagEditConfirm"
        >
        </el-input>
      </div>

      <KemTag
        v-else
        :label="item.value"
        :disabled="item.disabled"
        style="margin-right: 8px"
        :disable-transitions="true"
        effect="plain"
        :class="isActive(item) ? 'is-active' : ''"
      >
        <div
          class="label_box"
          :class="'label_box-' + uiType"
          @click.stop="onClick(item)"
          @contextmenu.prevent="
            (event) => {
              onContextmenu(event, item, index)
            }
          "
        >
          {{ item.label }}
          <i v-if="uiType === 'closable'" class="el-tag__close el-icon-close" @click="handleClose(item)" />
          <div v-if="isActive(item) && uiType === 'normal'" class="triangle-bottomright"></div>
          <div v-if="isActive(item) && uiType === 'normal'" class="dg-icon">✓</div>
        </div>
      </KemTag>
    </div>

    <div v-if="showAppendBtn" class="kem-tag_group-append">
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
    uiType: {
      // normal closable
      type: String,
      default: 'normal',
    },
  },
  data() {
    return {
      selected: [],
      inputVisible: false,
      inputValue: '',
      editValue: '',
      editItem: {},
    }
  },
  computed: {
    showEditBtn() {
      return this.$listeners.tagEdit
    },
    showDelBtn() {
      return this.$listeners.tagDel
    },
    showAppendBtn() {
      return this.$listeners.tagAppend
    },
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
    handleClose(item) {
      this.$emit('tagDel', item)
    },

    onContextmenu(event, item, index) {
      if (!this.showEditBtn && !this.showEditBtn) return
      this.editValue = ''
      this.editItem = {}
      const items = []
      if (this.showEditBtn) {
        items.push({
          label: '修改',
          icon: 'el-icon-edit',
          onClick: () => {
            const done = () => {
              this.$nextTick((_) => {
                // setTimeout(()=>{

                this.$refs.editTagInput[0].$refs.input.focus()

                //},500)
              })
            }
            this.editValue = item.label
            this.editItem = item

            this.$emit('tagEdit', item, index, done)
          },
        })
      }
      if (this.showDelBtn) {
        items.push({
          label: '删除',
          icon: 'el-icon-delete',
          onClick: () => {
            this.$emit('tagDel', item)
          },
        })
      }
      this.$contextmenu({
        items,

        event,
        //x: event.clientX,
        //y: event.clientY,
        customClass: 'custom-class',
        zIndex: 3000,
        minWidth: 80,
      })
      return false
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
    handleTagEditConfirm() {
      this.$emit('handleTagEditConfirm', this.editValue, this.editItem)
      this.editValue = ''
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
  .kem-tag_group-box {
    display: flex;
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
        .triangle-bottomright {
          position: absolute;
          right: -1px;
          bottom: -1px;
          width: 0;
          height: 0;
          border-bottom: 15px solid #3964fd;
          border-left: 15px solid transparent;
        }
        .dg-icon {
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
      .label_box-closable {
        padding-right: 6px;
      }
    }
    .kem-tag_group-eidt {
      display: inline-block;
      font-size: 12px;
      width: 100px;
      margin-right: 6px;
      .el-input__inner {
        height: 28px;
        line-height: 28px;
      }
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
