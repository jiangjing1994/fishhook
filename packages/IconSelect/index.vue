<template>
  <div>
    <!--todo-->
    <el-popover
      placement="bottom-start"
      width="450"
      trigger="click"
      @show="$refs['iconSelect'].reset()"
    >
      <IconDirectory ref="iconSelect" @selected="selected" />
      <KemInput
        slot="reference"
        v-model="iconvalue"
        style="width: 250px"
        placeholder="点击选择图标"
        readonly
      >
        <svg-icon
          v-if="iconvalue"
          slot="prefix"
          :icon-class="iconvalue"
          class="el-input__icon"
          style="height: 32px; width: 16px"
        />
        <i v-else slot="prefix" class="el-icon-search el-input__icon" />
      </KemInput>
    </el-popover>
  </div>
</template>

<script>
import IconDirectory from './IconDirectory'
/**
 * @displayName IconSelect icon选择器
 */
export default {
  name: 'SelectSvgIcon',
  components: {
    IconDirectory,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      iconvalue: '',
    }
  },
  // watch: {
  //   value(newValue) {
  //     this.$emit('input',newValue)
  //   }
  // },
  created() {
    this.iconvalue = this.value
  },
  methods: {
    selected(value) {
      this.iconvalue = value
      this.$emit('input', value)
    },
  },
}
</script>

<style scoped></style>
