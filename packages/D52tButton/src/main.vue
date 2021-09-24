<template>
  <div @click="focus">
    <el-link v-if="uiType === 'text'">
      <KemLabelText :value="value" />
    </el-link>

    <KemInput v-else v-model="value" readonly @click.stop="focus">
      <span slot="suffix">
        <i
          v-if="!$slots.default"
          class="el-input__icon el-icon-circle-close kem-d52t-button-icon"
          @click.stop="click"
        ></i>
        <span v-else @click.stop="click">
          <slot></slot>
        </span>
      </span>
    </KemInput>
  </div>
</template>

<script>
/**
 * @displayName KemD52tButton
 */
export default {
  name: 'KemD52tButton',
  props: {
    /**
     * ui类型
     * @values normal , text
     */
    uiType: {
      type: String,
      default: 'normal',
    },
    value: {
      type: String,
    },
  },
  data() {
    return {}
  },
  methods: {
    focus() {
      this.$emit('focus')
    },
    click() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss">
.kem-d52t-button-icon {
  cursor: pointer;
  &:hover {
    color: #0f80ff;
  }
}
</style>
