<!---->
<template>
  <el-dialog
    class="dialog__body kem-dialog__body"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :destroy-on-close="destroyOnClose"
    :fullscreen="fullscreen"
    :modal="modal"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div v-if="$slots.header || $attrs.header" slot="title">
      <div class="dialog__body--header">
        <div class="color--block"></div>
        <slot name="header">{{ $attrs.header }}</slot>
        <div class="dialog__menu--screen">
          <i class="el-dialog__close el-icon-full-screen" @click="handleFullScreen"></i>
        </div>
      </div>
    </div>
    <div class="dialog__body--content">
      <slot />
      <component :is="element" ref="component" v-bind="$attrs" v-on="$listeners" />
    </div>
    <div class="dialog__body--footer">
      <div v-if="$slots.footer">
        <div slot="footer">
          <slot name="footer" />
        </div>
      </div>
      <div v-else>
        <div slot="footer">
          <KemButton
            v-if="!!$listeners.save"
            type="primary"
            :loading="footerButton"
            @click="$emit('save')"
          >
            确 认
          </KemButton>
          <KemButton type="default" @click="$emit('update:visible', false)"> 取 消 </KemButton>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
/**
 * @displayName Dialog 对话框
 */
export default {
  name: 'KemDialog',

  props: {
    width: {
      type: String,
      default: '65vw',
    },
    footerButton: {
      type: Boolean,
      default: false,
    },
    isfullscreen: {
      type: Boolean,
      default: false,
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
    modal: {
      type: Boolean,
      default: false,
    },
    // eslint-disable-next-line vue/require-default-prop,vue/require-prop-types
    element: {},

    elementProps: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      isShow: false,
      fullscreen: false,
    }
  },
  created() {
    this.fullscreen = this.isfullscreen
  },
  methods: {
    show() {
      this.$emit('update:visible', true)
    },
    close() {
      this.$emit('update:visible', false)
    },
    handleFullScreen() {
      this.fullscreen = !this.fullscreen
    },

    start(params) {
      this.show()
      this.$nextTick(() => {
        if (this.$refs['component'].start) {
          this.$refs['component'].start(params)
        }
      })
    },

    end() {
      this.close()
      this.$emit('end')
    },
  },
}
</script>
<style lang="scss">
$--color-primary: 'yellow';

.kem-dialog__body {
  .el-dialog {
    border-radius: 4px;
  }
  .dialog__body--header {
    // background-color: red;

    position: relative;
    text-align: left;
    color: #333333;
    padding-bottom: 5px;
    .color--block {
      background-color: #0f80ff;
      margin-right: 5px;
      width: 12px;
      height: 12px;
      display: inline-block;
    }
    .dialog__menu--screen {
      position: absolute;
      right: 25px;
      top: 0px;
      color: #909399;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .dialog__body--content {
    text-align: left;
  }
  .dialog__body--footer {
    width: 100%;
    text-align: right;
    position: relative;
  }
  .lalal-color {
    background-color: $--color-primary;
  }
  .el-dialog__body {
    padding: 15px;
  }
  .el-dialog__header {
    padding: 15px;
    padding-bottom: 10px;
  }
  .el-dialog__headerbtn {
    top: 15px;
  }
}
</style>
